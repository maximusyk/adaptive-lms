import { setLoaderState } from '@features/loader-state.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IClass } from '../types/class.type';
import { setClassList } from '@features/classes.feature';

export const classAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'classAPI',
    tagTypes: [ 'Class' ],
    endpoints: (build) => ({
        createClass: build.mutation<IClass, IClass>({
            query: (classData) => ({
                url: '/api/classes',
                method: 'POST',
                body: classData,
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
            invalidatesTags: [ 'Class' ],
        }),
        updateClass: build.mutation<IClass, IClass>({
            query: (classData) => ({
                url: `/classes/${ classData._id }`,
                method: 'PATCH',
                body: classData,
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
            invalidatesTags: [ 'Class' ],
        }),
        getAllClasses: build.query<IClass[], void>({
            query: () => ({
                url: '/api/classes',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setClassList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'Class' ],
        }),
        getClass: build.query<IClass, string>({
            query: (classId) => ({
                url: `/classes/${ classId }`,
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
            providesTags: [ 'Class' ],
        }),
        deleteClass: build.mutation<string, string>({
            query: (classId) => ({
                url: `/classes/${ classId }`,
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
            invalidatesTags: [ 'Class' ],
        }),
    }),
});
