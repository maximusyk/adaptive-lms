import {
    appendChapterToList,
    removeChapterFromList,
    setActualChapter,
    setChapterList,
    unsetActualChapter,
    updateActualChapter,
    updateChapterInList,
} from '@features/chapters.feature';
import { setLoaderState } from '@features/loader-state.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IChapter, IChapterCreate } from '../types/chapter.type';

export const chapterAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'chapterAPI',
    tagTypes: [ 'Chapter' ],
    endpoints: (build) => ({
        createChapter: build.mutation<IChapter, IChapterCreate>({
            query: (chapter) => ({
                url: '/api/chapters',
                method: 'POST',
                body: chapter,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(appendChapterToList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Chapter' ],
        }),
        updateChapter: build.mutation<IChapter, IChapter>({
            query: (chapter) => ({
                url: `/chapters/${ chapter._id }`,
                method: 'PATCH',
                body: chapter,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateChapterInList(data));
                    dispatch(updateActualChapter(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Chapter' ],
        }),
        getAllChapters: build.query<IChapter[], void>({
            query: () => ({
                url: '/api/chapters',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setChapterList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'Chapter' ],
        }),
        getChapter: build.query<IChapter, string>({
            query: (chapterId) => ({
                url: `/chapters/${ chapterId }`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setActualChapter(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'Chapter' ],
        }),
        deleteChapter: build.mutation<string, string>({
            query: (chapterId) => ({
                url: `/chapters/${ chapterId }`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                    dispatch(removeChapterFromList(args));
                    dispatch(unsetActualChapter());
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Chapter' ],
        }),
    }),
});
