import { setLoaderState } from '@features/loader-state.feature';
import { setUnitList } from '@features/units.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IUnit } from '../types/unit.type';

export const unitAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'unitAPI',
    tagTypes: ['Unit'],
    endpoints: (build) => ({
        createUnit: build.mutation<IUnit, IUnit>({
            query: (unit) => ({
                url: '/units',
                method: 'POST',
                body: unit,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: ['Unit'],
        }),
        updateUnit: build.mutation<IUnit, IUnit>({
            query: (unit) => ({
                url: `/units/${unit._id}`,
                method: 'PATCH',
                body: unit,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: ['Unit'],
        }),
        getAllUnits: build.query<IUnit[], void>({
            query: () => ({
                url: '/units',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: ['Unit'],
        }),
        getUnit: build.query<IUnit, string>({
            query: (unitId) => ({
                url: `/units/${unitId}`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: ['Unit'],
        }),
        getUnitsByLecture: build.query<IUnit[], string>({
            query: (lectureId) => ({
                url: `/units/lecture/${lectureId}`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUnitList(data));
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: ['Unit'],
        }),
        getUnitsByChapter: build.query<IUnit[], string>({
            query: (chapterId) => ({
                url: `/units/chapter/${chapterId}`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUnitList(data));
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: ['Unit'],
        }),
        deleteUnit: build.mutation<string, string>({
            query: (unitId) => ({
                url: `/units/${unitId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: ['Unit'],
        }),
    }),
});
