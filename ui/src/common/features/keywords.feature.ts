import { IKeyword } from '@general-types/keyword.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IKeywordSlice {
    list: IKeyword[];
}

const initialState: IKeywordSlice = {
    list: [],
};

const keywordSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {
        setKeywordList(
            state: IKeywordSlice,
            action: PayloadAction<IKeyword[]>,
        ) {
            state.list = action.payload;
        },
        updateKeywordList(
            state: IKeywordSlice,
            action: PayloadAction<IKeyword>,
        ) {
            state.list = state.list.map((keyword) =>
                keyword._id === action.payload._id
                    ? { ...action.payload }
                    : keyword,
            );
        },
        removeKeyword(state: IKeywordSlice, action: PayloadAction<string>) {
            state.list = state.list.filter(
                (keyword) => keyword._id !== action.payload,
            );
        },
    },
});

export const { setKeywordList, updateKeywordList, removeKeyword } =
    keywordSlice.actions;
export default keywordSlice.reducer;
