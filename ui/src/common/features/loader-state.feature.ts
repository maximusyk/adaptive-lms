import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';

interface ILoaderState {
    status: boolean;
}

const initialState: ILoaderState = {
    status: true,
};

const loaderStateSlice = createSlice({
    name: 'globalLoaderState',
    initialState,
    reducers: {
        setLoaderState(state: ILoaderState, action: PayloadAction<boolean>) {
            state.status = action.payload;
        },
    },
    extraReducers: {
        [unauthorizeUser.type]: () => {
            return initialState;
        },
    },
});

export const { setLoaderState } = loaderStateSlice.actions;
export default loaderStateSlice.reducer;
