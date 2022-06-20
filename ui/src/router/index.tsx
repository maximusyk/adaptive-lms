import { AppLayout } from '@componentsLayout/app-layout';
import { CourseContent } from '@componentsLayout/courses/current-course';
import { LectureContent } from '@componentsLayout/courses/current-course/content';
import { QuizContent } from '@componentsLayout/courses/current-course/quiz-content';
import { UnitsContent } from '@componentsLayout/courses/current-course/units-content';
import { Courses } from '@pages/courses/course-list';
import { CoursePage } from '@pages/courses/current-course';
import { DashboardPage } from '@pages/dashboard';
import { ErrorPage } from '@pages/error-page';
import { LoginPage } from '@pages/login';
import { Navigate, RouteObject } from 'react-router-dom';
import { ContentHeader } from '../components/ui/content-header/content-header';

export enum RoutePath {
    INDEX = '/',
    NOT_FOUND = '*',
    LOGIN = 'login',
    DASHBOARD = 'dashboard',
    COURSE_LIST = 'courses',
    COURSE_DETAILS = ':course_id',
    COURSE_CHAPTER = 'chapters/:chapter_id',
    COURSE_CHAPTER_TEST = 'quizzes/:quiz_id',
    COURSE_CHAPTER_TEST_NEW = 'questions/new',
    COURSE_CHAPTER_TEST_EDIT = ':question_id/edit',
    COURSE_CHAPTER_TEST_PROGRESS = 'progress',
    COURSE_CHAPTER_LECTURE = 'lectures/:lecture_id',
    COURSE_CHAPTER_LECTURE_EDIT = 'edit',
    COURSE_CHAPTER_LECTURE_UNITS = 'units',
    COURSE_CHAPTER_LECTURE_UNITS_EDIT = 'edit',
}

export const publicRoutes: RouteObject[] = [
    {
        path: RoutePath.NOT_FOUND,
        element: <Navigate to={ RoutePath.LOGIN } replace />,
    },
    { path: RoutePath.LOGIN, element: <LoginPage /> },
];

export const privateRoutes: RouteObject[] = [
    {
        path: RoutePath.INDEX,
        element: <AppLayout />,
        children: [
            { path: RoutePath.DASHBOARD, element: <DashboardPage /> },
            {
                path: RoutePath.COURSE_LIST,
                children: [
                    {
                        index: true,
                        element: <Courses />,
                    },
                    {
                        path: RoutePath.COURSE_DETAILS,
                        element: <CoursePage />,
                        children: [
                            {
                                index: true,
                                element: <ContentHeader />,
                            },
                            {
                                path: RoutePath.COURSE_CHAPTER,
                                element: <CourseContent />,
                                children: [
                                    {
                                        path: RoutePath.COURSE_CHAPTER_LECTURE,
                                        children: [
                                            {
                                                index: true,
                                                element: <LectureContent />,
                                            },
                                            {
                                                path: RoutePath.COURSE_CHAPTER_LECTURE_EDIT,
                                                element: (
                                                    <LectureContent
                                                        isEditMode={ true }
                                                    />
                                                ),
                                            },
                                            {
                                                path: RoutePath.COURSE_CHAPTER_LECTURE_UNITS,
                                                children: [
                                                    {
                                                        index: true,
                                                        element: (
                                                            <UnitsContent />
                                                        ),
                                                    },
                                                    {
                                                        path: RoutePath.COURSE_CHAPTER_LECTURE_UNITS_EDIT,
                                                        element: (
                                                            <UnitsContent
                                                                isUnitEditor={
                                                                    true
                                                                }
                                                            />
                                                        ),
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        path: RoutePath.COURSE_CHAPTER_TEST,
                                        children: [
                                            {
                                                index: true,
                                                element: <QuizContent />,
                                            },
                                            {
                                                path: RoutePath.COURSE_CHAPTER_TEST_NEW,
                                                element: <QuizContent />,
                                            },
                                            {
                                                path: RoutePath.COURSE_CHAPTER_TEST_EDIT,
                                                element: <QuizContent />,
                                            },
                                            {
                                                path: RoutePath.COURSE_CHAPTER_TEST_PROGRESS,
                                                element: <CoursePage />,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                index: true,
                element: <Navigate to={ RoutePath.DASHBOARD } replace />,
            },
        ],
    },
    { path: RoutePath.NOT_FOUND, element: <ErrorPage statusCode={ 404 } /> },
];
