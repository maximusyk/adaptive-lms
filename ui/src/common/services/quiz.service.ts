import { setLoaderState } from '@features/loader-state.feature';
import { setQuizList, updateQuizsList } from '@features/quizzes.feature';
import { appendSubdivisionToList, updateQuizResults } from '@features/subdivisions.feature';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@store/base-query.store';
import { IQuiz, IQuizAnswerRequest, IQuizQuestion, IQuizResultsRequest } from '../types/quiz.type';

export const quizAPI = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'quizAPI',
    tagTypes: [ 'Quiz' ],
    endpoints: (build) => ({
        createQuiz: build.mutation<IQuiz, FormData>({
            query: (quiz) => ({
                url: '/quizzes',
                method: 'POST',
                body: quiz,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        appendSubdivisionToList({
                            item: data,
                            subdivisionType: 'quizzes',
                        }),
                    );
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Quiz' ],
        }),
        updateQuiz: build.mutation<IQuiz, IQuiz>({
            query: (quiz) => ({
                url: `/quizzes/${ quiz._id }`,
                method: 'PATCH',
                body: quiz,
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
            invalidatesTags: [ 'Quiz' ],
        }),
        updateQuestion: build.mutation<IQuizQuestion, IQuizQuestion>({
            query: (quizQuestion) => ({
                url: `/quizzes/question/${ quizQuestion._id }`,
                method: 'PATCH',
                body: quizQuestion,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateQuizsList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Quiz' ],
        }),
        checkQuizResult: build.mutation<number, IQuizResultsRequest>({
            query: (quizResultsRequest) => ({
                url: `/quizzes/result/${ quizResultsRequest.quizId }`,
                method: 'POST',
                body: quizResultsRequest.answers,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateQuizResults(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            invalidatesTags: [ 'Quiz' ],
        }),
        updateQuestionAnswers: build.mutation<IQuizQuestion,
            IQuizAnswerRequest>({
            query: (quizAnswers) => ({
                url: `/quizzes/answers/${ quizAnswers.answers[0].question }`,
                method: 'PATCH',
                body: quizAnswers,
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
            invalidatesTags: [ 'Quiz' ],
        }),
        getAllQuizs: build.query<IQuiz[], void>({
            query: () => ({
                url: '/quizzes',
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
            providesTags: [ 'Quiz' ],
        }),
        getQuiz: build.query<IQuiz, string>({
            query: (quizId) => ({
                url: `/quizzes/${ quizId }`,
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
            providesTags: [ 'Quiz' ],
        }),
        getStudentQuestions: build.query<IQuizQuestion[], string>({
            query: (quizId) => ({
                url: `/quizzes/question/${ quizId }`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                dispatch(setLoaderState(true));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setQuizList(data));
                } catch ( error ) {
                    console.log(error);
                }
                dispatch(setLoaderState(false));
            },
            providesTags: [ 'Quiz' ],
        }),
        deleteQuiz: build.mutation<string, string>({
            query: (quizId) => ({
                url: `/quizzes/${ quizId }`,
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
            invalidatesTags: [ 'Quiz' ],
        }),
    }),
});
