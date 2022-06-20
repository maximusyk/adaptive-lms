import { IUnit } from '@general-types/unit.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';
import { unsetActualChapter } from './chapters.feature';

interface IUnitSlice {
    list: IUnit[];
}

const initialState: IUnitSlice = {
    list: [],
};

const unitSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        setUnitList(state: IUnitSlice, action: PayloadAction<IUnit[]>) {
            state.list = action.payload;
        },
        updateUnitsList(state: IUnitSlice, action: PayloadAction<IUnit>) {
            state.list = state.list.map((unit) =>
                unit._id === action.payload._id ? { ...action.payload } : unit,
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

export const { setUnitList, updateUnitsList } = unitSlice.actions;
export default unitSlice.reducer;
