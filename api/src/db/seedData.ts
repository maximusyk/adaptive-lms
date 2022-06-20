import { IChapterSeed, IClassSeed, ICourseSeed, IQuizTypeSeed, IUserSeed } from '@general-types/index.types';

export const seedData: {
    [name: string]: (IChapterSeed | IClassSeed | ICourseSeed | IUserSeed | IQuizTypeSeed)[];
} = {
    chapters: [
        {
            _id: '627d29ea1f12b6eaac282e1e',
            title: 'Chapter 1: First Chapter',
            course: '627c08a54da1ba22d37a1d48',
            subdivisions: [],
        },
    ],
    classes: [
        {
            _id: '627c08af4da1ba22d37a1d58',
            title: 'IPZ',
            courses: [ '627c08a54da1ba22d37a1d48' ],
            students: [
                '61d1d389fb612627bfe5a1ea',
                '61d1d394fb612627bfe5a1f6',
                '61d1d381fb612627bfe5a1e4',
            ],
        },
    ],
    courses: [
        {
            _id: '627c08a54da1ba22d37a1d48',
            title: 'Course Title',
            instructor: '6194f8513cad418ef0c4ff16',
            classes: [ '627c08af4da1ba22d37a1d58' ],
            students: [
                '61d1d389fb612627bfe5a1ea',
                '61d1d394fb612627bfe5a1f6',
                '61d1d381fb612627bfe5a1e4',
            ],
            chapters: [ '627d29ea1f12b6eaac282e1e' ],
        },
    ],
    users: [
        {
            _id: '618c3b87383c3ddcefc6c7d3',
            email: '22usyk08@gmail.com',
            password:
                '$2a$10$ATydTo0HWsVDxx8l8ldVOuvWrp3yFIPNz.Y3m9dFt4iB82loOF2LC',
            profile_name: 'Maksym Usyk',
            profile_picture: '#9f70d4',
            role: 'admin',
            username: 'maksik',
        },
        {
            _id: '6194f8343cad418ef0c4ff10',
            email: 'stark.ind@gmail.com',
            password:
                '$2a$10$jZJNhRzmHXNwmOAL8Pkx6uvA0Z6UR.qP7XR01GE5W.a044kFejD.a',
            profile_name: 'Tony Stark',
            profile_picture: '#16bc8a',
            role: 'instructor',
            username: 'tony.stark',
        },
        {
            _id: '61d1d381fb612627bfe5a1e4',
            email: 'student1@gmail.com',
            password:
                '$2a$10$i5bJs73VTlQKEwpwrHVXgey66GD0/IWeTCG1i1bFHSWMvUMeoK5QG',
            profile_name: 'Student1',
            profile_picture: '#830fe2',
            progress: [],
            role: 'student',
            username: 'student1',
            class: '627c08af4da1ba22d37a1d58',
        },
    ],
    quiz_types: [
        {
            title: 'input',
        },
        {
            title: 'multiple',
        },
        {
            title: 'single',
        },
    ],
};
