import { IClass } from '@general-types/class.type';
import { ICourse } from '@general-types/course.type';
import { IUser } from '@general-types/user.type';
import { Meta } from 'antd-form-builder';

type List = [ _id: string, title: string ] | [ _id: string, profile_name: string ];

type itemsList = {
    userList: IUser[];
    classList: IClass[];
    courseList: ICourse[];
}

export const getDashboardMeta = (
    type: string,
    itemsList: itemsList,
    isAdmin = true,
) => {
    const studentsSelect = (itemsList.userList?.filter((user) => user?.role === 'student') || []) as IUser[];
    const instructorsSelect = (itemsList.userList?.filter((user) => user?.role === 'instructor') || []) as IUser[];
    const coursesSelect = (itemsList.courseList || []) as ICourse[];
    const classesSelect = (itemsList.classList || []) as IClass[];
    const usersMeta: Meta = {
        columns: 1,
        fields: [
            {
                key: 'profile_name',
                colSpan: 1,
                widgetProps: {
                    placeholder: 'Profile Name',
                },
            },
            {
                key: 'email',
                widgetProps: {
                    placeholder: 'Email',
                },
                colSpan: 1,
            },
            {
                key: 'password',
                widgetProps: {
                    placeholder: 'Password',
                },
                widget: 'password',
                colSpan: 1,
            },
            {
                key: 'role',
                colSpan: 1,
                widget: 'select',
                widgetProps: {
                    placeholder: 'Select user role',
                },
                options: [
                    { value: 'admin', label: 'Admin' },
                    { value: 'instructor', label: 'Instructor' },
                    { value: 'student', label: 'Student' },
                ],
            },
            {
                key: 'class',
                colSpan: 1,
                widget: 'select',
                widgetProps: {
                    placeholder: 'Select student class',
                },
                options: classesSelect.map((classItem) => ({ value: classItem?._id, label: classItem?.title })),
            },
        ],
    };
    const coursesMeta: Meta = {
        columns: 1,
        fields: [
            {
                key: 'title',
                widgetProps: {
                    placeholder: 'Course Name',
                },
                colSpan: 1,
            },
            {
                key: 'classes',
                widget: 'select',
                widgetProps: {
                    mode: 'multiple',
                    placeholder: 'Assign classes to course',
                },
                options: classesSelect.map((classItem) => ({ value: classItem?._id, label: classItem?.title })),
                colSpan: 1,
            },
        ],
    };
    if ( isAdmin && coursesMeta.fields && Array.isArray(coursesMeta.fields) ) {
        coursesMeta.fields.push({
            key: 'instructor',
            widgetProps: {
                placeholder: 'Assign instructor to course',
            },
            widget: 'select',
            options: instructorsSelect.map((instructor) => ({
                value: instructor._id,
                label: instructor.profile_name,
            })),
            colSpan: 1,
        });
    }
    const classesMeta: Meta = {
        columns: 1,
        fields: [
            {
                key: 'title',
                widgetProps: {
                    mode: 'multiple',
                    placeholder: 'Class Name',
                },
                colSpan: 1,
            },
            {
                key: 'students',
                widget: 'select',
                widgetProps: {
                    mode: 'multiple',
                    placeholder: 'Select class students',
                },
                options: studentsSelect.map(({ _id, profile_name }) => ({ value: _id, label: profile_name })),
                colSpan: 1,
            },
            {
                key: 'courses',
                widget: 'select',
                widgetProps: {
                    mode: 'multiple',
                    placeholder: 'Assign class courses',
                },
                options: coursesSelect.map(({ _id, title }) => ({ value: _id, label: title })),
                colSpan: 1,
            },
        ],
    };

    if ( type === 'users' ) {
        return usersMeta;
    }

    return type === 'courses' ? coursesMeta : classesMeta;
};
