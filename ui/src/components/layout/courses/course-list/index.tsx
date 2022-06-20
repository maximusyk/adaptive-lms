import { ICourse } from '@general-types/course.type';
import { useAppSelector } from '@hooks/redux.hook';
import { List } from 'antd';
import CourseItem from './course-item';

interface ICourseList {
    courses: ICourse[];
}

export const CourseList = ({ courses }: ICourseList) => {
    const actualUser = useAppSelector((state) => state.users.item);
    return (
        <List
            className='overflow-x-hidden overflow-y-scroll'
            grid={{
                gutter: 20,
                column: 5,
            }}
            dataSource={courses.length ? [...courses] : []}
            renderItem={(course) => <CourseItem course={course} />}
        />
    );
};
