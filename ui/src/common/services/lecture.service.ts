import { setLoaderState } from '@features/loader-state.feature';
import { appendSubdivisionToList, updateActualSubdivision } from '@features/subdivisions.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { ILecture } from '../types/lecture.type';

export const lectureAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'lectureAPI',
    tagTypes: [ 'Lecture' ],
    endpoints: (build) => ({
        createLecture: build.mutation<ILecture, FormData>({
            query: (lecture) => ({
                url: '/api/lectures',
                method: 'POST',
                body: lecture,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        appendSubdivisionToList({
                            item: data,
                            subdivisionType: 'lectures',
                        }),
                    );
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Lecture' ],
        }),
        updateLecture: build.mutation<ILecture, ILecture>({
            query: (lecture) => ({
                url: `/lectures/${ lecture._id }`,
                method: 'PATCH',
                body: lecture,
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
            invalidatesTags: [ 'Lecture' ],
        }),
        getAllLectures: build.query<ILecture[], void>({
            query: () => ({
                url: '/api/lectures',
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
            providesTags: [ 'Lecture' ],
        }),
        getLecture: build.query<ILecture, string>({
            query: (lectureId) => ({
                url: `/lectures/${ lectureId }`,
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
            providesTags: [ 'Lecture' ],
        }),
        deleteLecture: build.mutation<string, string>({
            query: (lectureId) => ({
                url: `/lectures/${ lectureId }`,
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
            invalidatesTags: [ 'Lecture' ],
        }),
        readLecture: build.query<string, string>({
            query: (lectureId) => ({
                url: `/lectures/file/${ lectureId }`,
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
            providesTags: [ 'Lecture' ],
        }),
        editLecture: build.mutation<ILecture, FormData>({
            query: (lectureFile) => ({
                url: `/lectures/file/${ lectureFile.get('lecture_id') }`,
                method: 'PATCH',
                body: lectureFile,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateActualSubdivision(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Lecture' ],
        }),
    }),
});
