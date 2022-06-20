import { IClass } from '@general-types/class.type';
import { ICourse } from '@general-types/course.type';
import { IUser } from '@general-types/user.type';
import { getInitials } from '@utils/get-initials.utils';
import { Space, Tag } from 'antd';
import { Avatar } from '@chakra-ui/react';

const getRoleTagColor = (role: string) => {
    if ( role === 'admin' ) return 'purple';
    return role === 'instructor' ? 'pink' : 'green';
};

const users = [
    {
        title: 'Name',
        dataIndex: 'profile_name',
        id: 'profile_name',
        sorter: (
            { profile_name: firstUser }: IUser,
            { profile_name: secondUser }: IUser,
        ) => {
            return firstUser && secondUser ? firstUser > secondUser : false;
        },
        render: (text: string, { profile_picture }: IUser): JSX.Element => (
            <Space>

                <Avatar
                    size={ 'sm' }
                    name={ text || '' }
                    bg={ profile_picture }
                    // className={ 'mix-blend-lighten' }
                />
                {/*<Avatar size='large' style={{ background: profile_picture }}>*/ }
                {/*    {text && getInitials(text)}*/ }
                {/*</Avatar>*/ }
                { text }
            </Space>
        ),
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        id: 'email',
        render: (text: string): JSX.Element => (
            <a href={ `mailto:${ text }` }>{ text }</a>
        ),
    },
    {
        title: 'Role',
        dataIndex: 'role',
        id: 'role',
        sorter: ({ role: firstUser }: IUser, { role: secondUser }: IUser) => {
            return firstUser && secondUser ? firstUser > secondUser : false;
        },
        render: (text: string): JSX.Element => (
            <Tag
                style={ { fontSize: '.8rem', fontWeight: 'bold' } }
                color={ getRoleTagColor(text) }
            >
                { text[0].toUpperCase() + text.slice(1) }
            </Tag>
        ),
    },
    {
        title: 'Class',
        dataIndex: 'class',
        id: 'class',
        render: (text: IClass): JSX.Element => (
            <span>{ text?.title ? text.title : 'None' }</span>
        ),
        sorter: ({ class: firstUser }: IUser, { class: secondUser }: IUser) => {
            return firstUser && secondUser ? firstUser > secondUser : false;
        },
    },
];
const courses = [
    {
        title: 'Title',
        dataIndex: 'title',
        id: 'title',
        sorter: (
            { title: firstCourse }: ICourse,
            { title: secondCourse }: ICourse,
        ) => {
            return firstCourse && secondCourse
                ? firstCourse > secondCourse
                : false;
        },
    },
    {
        title: 'Instructor',
        dataIndex: 'instructor',
        id: 'instructor',
        sorter: (
            { instructor: firstCourse }: ICourse,
            { instructor: secondCourse }: ICourse,
        ) => {
            return firstCourse && secondCourse
                ? firstCourse > secondCourse
                : false;
        },
        render: (text: IUser): JSX.Element =>
            text ? (
                <Space>
                    <Avatar
                        size="large"
                        style={ { background: text?.profile_picture } }
                    >
                        { text?.profile_name &&
                            getInitials(text?.profile_name || '') }
                    </Avatar>
                    <Space direction="vertical">
                        <span> { text?.profile_name } </span>{ ' ' }
                        <span> { text?.email } </span>
                    </Space>
                </Space>
            ) : (
                <span>None</span>
            ),
    },
    {
        title: 'Students',
        dataIndex: 'students',
        id: 'students',
        render: (text: IUser[]) => text.length,
        sorter: (record1: ICourse, record2: ICourse) => {
            if ( record1.students && record2.students )
                return record1.students > record2.students;
        },
    },
    {
        title: 'Classes',
        dataIndex: 'classes',
        id: 'classes',
        render: (text: IClass[]): JSX.Element => <span>{ text?.length }</span>,
        sorter: (
            { classes: firstCourse }: ICourse,
            { classes: secondCourse }: ICourse,
        ) => {
            return firstCourse && secondCourse
                ? firstCourse > secondCourse
                : false;
        },
    },
];
const classes = [
    {
        title: 'Name',
        dataIndex: 'title',
        id: 'title',
        sorter: (
            { title: firstClass }: IClass,
            { title: secondClass }: IClass,
        ) => {
            return firstClass && secondClass ? firstClass > secondClass : false;
        },
    },
    {
        title: 'Students',
        dataIndex: 'students',
        id: 'students',
        render: (text: IClass[]) => <span>{ text.length }</span>,
        sorter: (
            { students: firstClass }: IClass,
            { students: secondClass }: IClass,
        ) => {
            return firstClass && secondClass ? firstClass > secondClass : false;
        },
    },
    {
        title: 'Courses',
        dataIndex: 'courses',
        id: 'courses',
        render: (text: IClass[]): JSX.Element => <span>{ text.length }</span>,
        sorter: (
            { courses: firstClass }: IClass,
            { courses: secondClass }: IClass,
        ) => {
            return firstClass && secondClass ? firstClass > secondClass : false;
        },
    },
];

const dashboardForStudents = [
    {
        title: 'Course',
        dataIndex: 'title',
        key: 'title',
        id: 'title',
    },
];

const nestedDashboardForStudents = [
    {
        title: 'Quiz',
        dataIndex: 'title',
        key: 'title',
        id: 'title',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        id: 'score',
    },
];

const dashboardForInstructors = [
    {
        title: 'Course',
        dataIndex: 'title',
        key: '_id',
        id: '_id',
    },
];

type RenderType = (
    text: IClass[] | IUser | IClass | string,
    record?: IUser,
) => JSX.Element;

type SorterType = (
    firstRecord: IUser | ICourse | IClass,
    secondRecord: IUser | ICourse | IClass,
) => boolean;

interface ColumnType {
    title: string;
    dataIndex: string;
    id: string;
    render?: RenderType;
    sorter?: SorterType;
}

interface IColumns {
    [key: string]: ColumnType[];
}

const columns: any = {
    users,
    courses,
    classes,
    dashboardForStudents,
    nestedDashboardForStudents,
    dashboardForInstructors,
};

export default columns;
