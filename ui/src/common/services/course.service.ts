import { setChapterList } from '@features/chapters.feature';
import {
    appendCourseToList,
    removeCourseFromList,
    setActualCourse,
    setCourseList,
    unsetActualCourse,
    updateCourseInList,
} from '@features/courses.feature';
import { setLoaderState } from '@features/loader-state.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { ICourse } from '../types/course.type';

export const courseAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'courseAPI',
    tagTypes: [ 'Course' ],
    endpoints: (build) => ({
        createCourse: build.mutation<ICourse, ICourse>({
            query: (course) => ({
                url: '/api/courses',
                method: 'POST',
                body: course,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(appendCourseToList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Course' ],
        }),
        updateCourse: build.mutation<ICourse, ICourse>({
            query: (course) => ({
                url: `/courses/${ course._id }`,
                method: 'PATCH',
                body: course,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateCourseInList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Course' ],
        }),
        getAllCourses: build.query<ICourse[], void>({
            query: () => ({
                url: '/api/courses',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                dispatch(unsetActualCourse());
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCourseList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'Course' ],
        }),
        getCourse: build.query<ICourse, string>({
            query: (courseId) => ({
                url: `/courses/${ courseId }`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setActualCourse(data));
                    dispatch(setChapterList(data.chapters));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'Course' ],
        }),
        deleteCourse: build.mutation<string, string>({
            query: (courseId) => ({
                url: `/courses/${ courseId }`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                    dispatch(removeCourseFromList(args));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Course' ],
        }),
    }),
});
