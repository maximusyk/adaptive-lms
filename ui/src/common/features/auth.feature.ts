import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@general-types/user.type';

interface IAuthSlice {
    user?: string | IUser;
    accessToken?: string;
    isAuthenticated: boolean;
}

interface IAuthSliceAction extends PayloadAction<IAuthSlice> {
    user: IUser;
}

const initialState: IAuthSlice = {
    user: '',
    accessToken: '',
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorizeUser(state, action: PayloadAction<Partial<IAuthSlice>>) {
            localStorage.setItem(
                'authData',
                JSON.stringify({ ...action.payload }),
            );
            state = { ...state, isAuthenticated: true, ...action.payload };
        },
        updateAuthData(state, action: PayloadAction<Partial<IAuthSlice>>) {
            const authData = { ...state, ...action.payload };
            localStorage.setItem('authData', JSON.stringify({ ...authData }));
            return { ...state, ...action.payload };
        },
        unauthorizeUser() {
            localStorage.removeItem('authData');
            return initialState;
        },
    },
});

export const { authorizeUser, updateAuthData, unauthorizeUser } =
    authSlice.actions;
export default authSlice.reducer;
