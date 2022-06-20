import { ICourse } from './course.type';
import { IUser } from './user.type';

export interface IClass {
    _id: string;
    title: string;
    students: IUser[];
    courses: ICourse[];
}
