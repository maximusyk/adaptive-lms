import authReducer from '@features/auth.feature';
import chapterReducer from '@features/chapters.feature';
import courseReducer from '@features/courses.feature';
import classReducer from '@features/classes.feature';
import errorReducer from '@features/errors.feature';
import keywordReducer from '@features/keywords.feature';
import loaderStateReducer from '@features/loader-state.feature';
import quizReducer from '@features/quizzes.feature';
import studentQuizReducer from '@features/student-quiz.feature';
import subdivisionReducer from '@features/subdivisions.feature';
import unitReducer from '@features/units.feature';
import userReducer from '@features/users.feature';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from '@services/auth.service';
import { chapterAPI } from '@services/chapter.service';
import { classAPI } from '@services/class.service';
import { courseAPI } from '@services/course.service';
import { keywordAPI } from '@services/keyword.service';
import { lectureAPI } from '@services/lecture.service';
import { quizAPI } from '@services/quiz.service';
import { unitAPI } from '@services/unit.service';
import { userAPI } from '@services/user.service';
import { rtkQueryErrorHandler } from './error-handler.store';

const reducer = combineReducers({
    users: userReducer,
    chapters: chapterReducer,
    keywords: keywordReducer,
    courses: courseReducer,
    classes: classReducer,
    units: unitReducer,
    quizzes: quizReducer,
    globalLoaderState: loaderStateReducer,
    auth: authReducer,
    studentQuiz: studentQuizReducer,
    subdivisions: subdivisionReducer,
    errors: errorReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [chapterAPI.reducerPath]: chapterAPI.reducer,
    [classAPI.reducerPath]: classAPI.reducer,
    [courseAPI.reducerPath]: courseAPI.reducer,
    [lectureAPI.reducerPath]: lectureAPI.reducer,
    [quizAPI.reducerPath]: quizAPI.reducer,
    [unitAPI.reducerPath]: unitAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [keywordAPI.reducerPath]: keywordAPI.reducer,
});

export const store = configureStore({
    reducer,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            chapterAPI.middleware,
            authAPI.middleware,
            userAPI.middleware,
            quizAPI.middleware,
            unitAPI.middleware,
            classAPI.middleware,
            courseAPI.middleware,
            lectureAPI.middleware,
            keywordAPI.middleware,
            rtkQueryErrorHandler,
        ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
