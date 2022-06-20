import { IChapter } from './chapter.type';
import { IClass } from './class.type';
import { IUser } from './user.type';

export interface ICourse {
    _id: string;
    title: string;
    instructor: IUser;
    chapters: IChapter[];
    classes: IClass[];
    students: IUser[];
}
