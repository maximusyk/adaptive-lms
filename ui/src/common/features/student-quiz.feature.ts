import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStudentQuizSlice {
    status: string;
}

const initialState: IStudentQuizSlice = {
    status: 'start',
};

const studentQuizSlice = createSlice({
    name: 'studentQuiz',
    initialState,
    reducers: {
        setStudentQuizStatus(
            state: IStudentQuizSlice,
            action: PayloadAction<string>,
        ) {
            state.status = action.payload;
        },
    },
});

export const { setStudentQuizStatus } = studentQuizSlice.actions;
export default studentQuizSlice.reducer;
