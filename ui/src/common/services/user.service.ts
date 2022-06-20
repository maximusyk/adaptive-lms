import { setLoaderState } from '@features/loader-state.feature';
import { setActualUser, setUserList } from '@features/users.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IUser } from '../types/user.type';

export const userAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'userAPI',
    tagTypes: [ 'User' ],
    endpoints: (build) => ({
        verify: build.query<IUser, string>({
            query: (userId) => ({
                url: `/users/${ userId }`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setActualUser(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
        }),
        createUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: '/api/users',
                method: 'POST',
                body: user,
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
            invalidatesTags: [ 'User' ],
        }),
        updateUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users/${ user._id }`,
                method: 'PATCH',
                body: user,
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
            invalidatesTags: [ 'User' ],
        }),
        getAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: '/api/users',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'User' ],
        }),
        getUser: build.query<IUser, string>({
            query: (userId) => ({
                url: `/users/${ userId }`,
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
            providesTags: [ 'User' ],
        }),
        deleteUser: build.mutation<string, string>({
            query: (userId) => ({
                url: `/users/${ userId }`,
                method: 'DELETE',
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
            invalidatesTags: [ 'User' ],
        }),
    }),
});
