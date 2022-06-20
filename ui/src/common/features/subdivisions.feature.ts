import { SubdivisionItemType } from '@general-types/chapter.type';
import { ILecture } from '@general-types/lecture.type';
import { IQuiz, IUserQuizResult } from '@general-types/quiz.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';
import { setActualChapter, unsetActualChapter } from './chapters.feature';
import { useAppSelector } from '@hooks/redux.hook';

interface ISubdivisionSlice {
    item: ILecture | IQuiz;
    list: SubdivisionItemType[];
}

const initialState: ISubdivisionSlice = {
    item: {} as ILecture | IQuiz,
    list: [],
};

const subdivisionSlice = createSlice({
    name: 'subdivisions',
    initialState,
    reducers: {
        setActualSubdivision(state, action: PayloadAction<ILecture | IQuiz>) {
            state.item = action.payload;
        },
        updateActualSubdivision(
            state,
            action: PayloadAction<Partial<ILecture | IQuiz>>,
        ) {
            state.item = { ...state.item, ...action.payload };
        },
        updateQuizResults(state, action: PayloadAction<number>) {
            const currentUser = useAppSelector((state) => state.users.item._id);
            const currentQuiz = state.item as IQuiz;
            currentQuiz.results!.map((result: IUserQuizResult) => result.user === currentUser ? {
                ...result,
                score: action.payload,
            } : result);
            state.item = { ...currentQuiz };
        },
        unsetActualSubdivision(state) {
            state.item = {} as ILecture | IQuiz;
        },
        setSubdivisionList(
            state,
            action: PayloadAction<SubdivisionItemType[]>,
        ) {
            state.list = action.payload;
        },
        appendSubdivisionToList(
            state,
            action: PayloadAction<SubdivisionItemType>,
        ) {
            state.list.push(action.payload);
        },
        removeSubdivisionFromList(state, action: PayloadAction<string>) {
            state.list = state.list.filter(
                ({ item: { _id } }) => _id !== action.payload,
            );
        },
        updateSubdivisionInList(
            state,
            action: PayloadAction<SubdivisionItemType>,
        ) {
            state.list = state.list.map((subdivision) =>
                subdivision.item._id === action.payload.item._id
                    ? action.payload
                    : subdivision,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(unauthorizeUser, () => {
            return initialState;
        });
        builder.addCase(setActualChapter, (state, action) => {
            state.list = [ ...action.payload.subdivisions ];
        });
        builder.addCase(unsetActualChapter, () => {
            return initialState;
        });
    },
});

export const {
    setActualSubdivision,
    updateActualSubdivision,
    updateQuizResults,
    setSubdivisionList,
    appendSubdivisionToList,
    removeSubdivisionFromList,
    updateSubdivisionInList,
} = subdivisionSlice.actions;
export default subdivisionSlice.reducer;
