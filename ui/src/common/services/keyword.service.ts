import { setLoaderState } from '@features/loader-state.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IKeyword } from '../types/keyword.type';

export const keywordAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'keywordAPI',
    tagTypes: [ 'Keyword' ],
    endpoints: (build) => ({
        createKeyword: build.mutation<IKeyword, IKeyword>({
            query: (keyword) => ({
                url: '/api/keywords',
                method: 'POST',
                body: keyword,
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
            invalidatesTags: [ 'Keyword' ],
        }),
        updateKeyword: build.mutation<IKeyword, IKeyword>({
            query: (keyword) => ({
                url: `/api/keywords/${ keyword._id }`,
                method: 'PATCH',
                body: keyword,
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
            invalidatesTags: [ 'Keyword' ],
        }),
        getAllKeywords: build.query<IKeyword[], void>({
            query: () => ({
                url: '/api/keywords',
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
            providesTags: [ 'Keyword' ],
        }),
        getKeyword: build.query<IKeyword, string>({
            query: (keywordId) => ({
                url: `/api/keywords/${ keywordId }`,
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
            providesTags: [ 'Keyword' ],
        }),
        deleteKeyword: build.mutation<string, string>({
            query: (keywordId) => ({
                url: `/api/keywords/${ keywordId }`,
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
            invalidatesTags: [ 'Keyword' ],
        }),
    }),
});
