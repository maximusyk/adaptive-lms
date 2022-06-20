import { IChapter } from './chapter.type';
import { ICourse } from './course.type';
import { IKeyword } from './keyword.type';
import { ILecture } from './lecture.type';

export interface IUnit {
    _id: string;
    title: string;
    lecture: ILecture;
    chapter: IChapter;
    course: ICourse;
    content: string;
    keywords: IKeyword[];
    cohesionRate: UnitCohesionRate[];
}

export type UnitCohesionRate = {
    unit: string;
    rate: number;
};
