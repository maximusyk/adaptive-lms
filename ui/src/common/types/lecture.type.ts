import { IUnit } from './unit.type';

export interface ILecture {
    _id: string;
    title: string;
    fileId: string;
    units: IUnit[];
    viewable: boolean;
}

export interface ILectureFile {
    _id: string;
    content: Blob;
}
