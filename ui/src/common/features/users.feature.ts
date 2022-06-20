import { IUser } from '@general-types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorizeUser, unauthorizeUser } from './auth.feature';

interface IUserSlice {
    item: IUser;
    list: IUser[];
}

const initialState: IUserSlice = {
    item: {} as IUser,
    list: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setActualUser(state, action: PayloadAction<IUser>) {
            state.item = action.payload;
        },
        unsetActualUser(state) {
            state.item = {} as IUser;
        },
        updateActualUser(state, action: PayloadAction<Partial<IUser>>) {
            state.item = { ...state.item, ...action.payload };
        },
        setUserList(state, action: PayloadAction<IUser[]>) {
            state.list = action.payload;
        },
        appendUserToList(state, action: PayloadAction<IUser>) {
            state.list.push(action.payload);
        },
        removeUserFromList(state, action: PayloadAction<IUser>) {
            state.list = state.list.filter(
                (user) => user._id !== action.payload._id,
            );
        },
        updateUserInList(state, action: PayloadAction<IUser>) {
            state.list = state.list.map((user) =>
                user._id === action.payload._id ? action.payload : user,
            );
        },
    },
    extraReducers: {
        [unauthorizeUser.type]: () => {
            return initialState;
        },
        [authorizeUser.type]: (state, action: PayloadAction<IUser>) => {
            state.item = action.payload;
        },
    },
});

export const {
    setActualUser,
    unsetActualUser,
    updateActualUser,
    setUserList,
    appendUserToList,
    removeUserFromList,
    updateUserInList,
} = userSlice.actions;
export default userSlice.reducer;
