import { IQuizQuestion } from '@general-types/quiz.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';
import { unsetActualChapter } from './chapters.feature';

interface IQuizSlice {
    list: IQuizQuestion[];
}

const initialState: IQuizSlice = {
    list: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizList(state: IQuizSlice, action: PayloadAction<IQuizQuestion[]>) {
            state.list = action.payload;
        },
        updateQuizsList(
            state: IQuizSlice,
            action: PayloadAction<IQuizQuestion>,
        ) {
            state.list = state.list.map((quiz) =>
                quiz._id === action.payload._id ? { ...action.payload } : quiz,
            );
        },
        removeQuiz(state: IQuizSlice, action: PayloadAction<string>) {
            state.list = state.list.filter(
                (quiz) => quiz._id !== action.payload,
            );
        },
    },
    extraReducers: {
        [unauthorizeUser.type]: () => {
            return initialState;
        },
        [unsetActualChapter.type]: () => {
            return initialState;
        },
    },
});

export const { setQuizList, updateQuizsList, removeQuiz } = quizSlice.actions;
export default quizSlice.reducer;
