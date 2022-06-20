import CourseItem from '@componentsLayout/courses/course-list/course-item';
import { ICourse } from '@general-types/course.type';
import { useAppSelector } from '@hooks/redux.hook';
import { courseAPI } from '@services/course.service';
import { List } from 'antd';
import { FC, useEffect } from 'react';
import './index.scss';

export const Courses: FC = () => {
    const courses: ICourse[] = useAppSelector((state) => state.courses.list);
    const [ getLazyCourses ] = courseAPI.useLazyGetAllCoursesQuery({
        refetchOnFocus: true,
    });

    const fetchCourses = async () => getLazyCourses();

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <List
            className="overflow-x-hidden overflow-y-scroll"
            dataSource={ courses }
            renderItem={ (course) => <CourseItem course={ course } /> }
        />
    );
};
