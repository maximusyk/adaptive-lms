import { ICourse } from '@general-types/course.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unauthorizeUser } from './auth.feature';

interface ICourseSlice {
    item: ICourse;
    list: ICourse[];
}

const initialState: ICourseSlice = {
    item: {} as ICourse,
    list: [] as ICourse[],
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setActualCourse(state, action: PayloadAction<ICourse>) {
            state.item = action.payload;
        },
        unsetActualCourse(state) {
            state.item = {} as ICourse;
        },
        updateActualCourse(state, action: PayloadAction<Partial<ICourse>>) {
            state.item = { ...state.item, ...action.payload };
        },
        setCourseList(state, action: PayloadAction<ICourse[]>) {
            state.list = action.payload;
        },
        appendCourseToList(state, action: PayloadAction<ICourse>) {
            state.list.push(action.payload);
        },
        removeCourseFromList(state, action: PayloadAction<ICourse | string>) {
            state.list = state.list.filter(
                (course) =>
                    course._id !==
                    (typeof action.payload === 'string'
                        ? action.payload
                        : action.payload._id),
            );
        },
        updateCourseInList(state, action: PayloadAction<ICourse>) {
            state.list = state.list.map((course) =>
                course._id === action.payload._id ? action.payload : course,
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
    setActualCourse,
    unsetActualCourse,
    updateActualCourse,
    setCourseList,
    appendCourseToList,
    removeCourseFromList,
    updateCourseInList,
} = courseSlice.actions;
export default courseSlice.reducer;
