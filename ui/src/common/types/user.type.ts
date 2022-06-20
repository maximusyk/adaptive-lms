import { IClass } from './class.type';
import { ICourse } from './course.type';

export interface IUser {
    _id: string;
    profile_name: string;
    profile_picture: string;
    username: string;
    email: string;
    password: string;
    role: string;
    progress?: UserProgress[];
    class: IClass;
    token: string;
    class_name: string;
}

export type UserProgress = {
    course: ICourse;
    value: number;
};
