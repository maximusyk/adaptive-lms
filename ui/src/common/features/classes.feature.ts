import { IClass } from '@general-types/class.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';

interface IClassSlice {
    item: IClass;
    list: IClass[];
}

const initialState: IClassSlice = {
    item: {} as IClass,
    list: [] as IClass[],
};

const classSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        setClassList(state, action: PayloadAction<IClass[]>) {
            state.list = action.payload;
        },
        appendClassToList(state, action: PayloadAction<IClass>) {
            state.list.push(action.payload);
        },
        removeClassFromList(state, action: PayloadAction<IClass | string>) {
            state.list = state.list.filter(
                (classItem) =>
                    classItem._id !==
                    (typeof action.payload === 'string'
                        ? action.payload
                        : action.payload._id),
            );
        },
        updateClassInList(state, action: PayloadAction<IClass>) {
            state.list = state.list.map((classItem) =>
                classItem._id === action.payload._id ? action.payload : classItem,
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
    setClassList,
    appendClassToList,
    removeClassFromList,
    updateClassInList,
} = classSlice.actions;
export default classSlice.reducer;
