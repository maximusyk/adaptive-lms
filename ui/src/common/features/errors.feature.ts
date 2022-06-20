import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';

interface IErrorSlice {
    list: string[];
}

const initialState: IErrorSlice = {
    list: [],
};

const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        addError(state: IErrorSlice, action: PayloadAction<string>) {
            state.list.push(action.payload);
        },
        removeError(state: IErrorSlice, action: PayloadAction<string>) {
            state.list = state.list.filter((error) => error !== action.payload);
        },
    },
    extraReducers: {
        [unauthorizeUser.type]: () => {
            return initialState;
        },
    },
});

export const { addError, removeError } = errorsSlice.actions;
export default errorsSlice.reducer;
