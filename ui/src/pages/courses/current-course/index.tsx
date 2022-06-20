import CourseCurriculum from '@componentsLayout/courses/current-course/curriculum';
import { useAppSelector } from '@hooks/redux.hook';
import { courseAPI } from '@services/course.service';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import '../index.scss';

// interface ICoursePage {}

export const CoursePage = () => {
    const { course_id } = useParams();

    const actualCourseId = useAppSelector((state) => state.courses.item._id);
    const [getCourse] = courseAPI.useLazyGetCourseQuery();

    const handleCourse = async () => getCourse(course_id as string);

    useEffect(() => {
        if (!actualCourseId || actualCourseId !== course_id) {
            handleCourse();
        }
    }, [course_id]);
    return (
        <Layout className='course-layout'>
            <Layout>
                <Outlet />
            </Layout>
            <CourseCurriculum />
        </Layout>
    );
};
