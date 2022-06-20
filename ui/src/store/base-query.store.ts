import { authorizeUser, unauthorizeUser } from '@features/auth.feature';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { IAuthResponse } from '../common/types/auth.type';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    // baseUrl: import.meta.env.LMS_API_URL,
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers) => {
        const accessToken = JSON.parse(
            localStorage.getItem('authData') as string,
        )?.accessToken;
        if ( accessToken )
            headers.append('Authorization', `Bearer ${ accessToken }`);
        return headers;
    },
});
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if ( result.error && result.error.status === 401 ) {
        // checking whether the mutex is locked
        if ( !mutex.isLocked() ) {
            const release = await mutex.acquire();
            try {
                const { data } = await baseQuery(
                    '/auth/refresh',
                    api,
                    extraOptions,
                );
                const refreshResponse = data as IAuthResponse;
                if ( refreshResponse ) {
                    api.dispatch(
                        authorizeUser({
                            user: refreshResponse.user,
                            accessToken: refreshResponse.accessToken,
                        }),
                    );
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(unauthorizeUser());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
