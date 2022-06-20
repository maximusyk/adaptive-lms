import { ICourse } from './course.type';
import { ILecture } from './lecture.type';
import { IQuiz } from './quiz.type';

export interface IChapter {
    _id: string;
    title: string;
    course: ICourse;
    subdivisions: SubdivisionItemType[];
}

export type SubdivisionItemType = {
    item: ILecture | IQuiz;
    subdivisionType: 'lectures' | 'quizzes';
};

export interface IChapterCreate {
    title: string;
    course: string;
}

export interface ISubdivisionCreate {
    title: string;
    chapter: string;
    type: 'Lecture' | 'Quiz';
}
