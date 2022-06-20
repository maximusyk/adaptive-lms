import { IChapter } from '@general-types/chapter.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';

interface IChapterSlice {
    item: IChapter;
    list: IChapter[];
}

const initialState: IChapterSlice = {
    item: {} as IChapter,
    list: [],
};

const chapterSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        setActualChapter(state, action: PayloadAction<IChapter>) {
            state.item = action.payload;
        },
        unsetActualChapter(state) {
            state.item = {} as IChapter;
        },
        updateActualChapter(state, action: PayloadAction<Partial<IChapter>>) {
            state.item = { ...state.item, ...action.payload };
        },
        setChapterList(state, action: PayloadAction<IChapter[]>) {
            state.list = action.payload;
        },
        appendChapterToList(state, action: PayloadAction<IChapter>) {
            state.list.push(action.payload);
        },
        removeChapterFromList(state, action: PayloadAction<string>) {
            state.list = state.list.filter(
                (chapter) => chapter._id !== action.payload,
            );
        },
        updateChapterInList(state, action: PayloadAction<IChapter>) {
            state.list = state.list.map((chapter) =>
                chapter._id === action.payload._id ? action.payload : chapter,
            );
        },
    },
    extraReducers: {
        [unauthorizeUser.type]: () => {
            return initialState;
        },
    },
});

export const {
    setActualChapter,
    unsetActualChapter,
    updateActualChapter,
    setChapterList,
    appendChapterToList,
    removeChapterFromList,
    updateChapterInList,
} = chapterSlice.actions;
export default chapterSlice.reducer;
