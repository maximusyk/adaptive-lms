import { authorizeUser, unauthorizeUser } from '@features/auth.feature';
import { setLoaderState } from '@features/loader-state.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IAuthRequest, IAuthResponse } from '../types/auth.type';
import { userAPI } from './user.service';

export const authAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'authAPI',
    tagTypes: [ 'Auth' ],
    endpoints: (build) => ({
        login: build.mutation<IAuthResponse, IAuthRequest>({
            query: (authRequest) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: authRequest,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(authorizeUser(data));
                    if ( data.user ) {
                        await dispatch(
                            userAPI.endpoints.verify.initiate(data.user),
                        );
                    } else {
                        dispatch(unauthorizeUser());
                    }
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Auth' ],
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Auth' ],
        }),
        refreshToken: build.mutation<IAuthResponse, void>({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Auth' ],
        }),
    }),
});
