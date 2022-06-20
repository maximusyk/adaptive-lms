import { IChapter } from './chapter.type';
import { ICourse } from './course.type';
import { IUnit } from '@general-types/unit.type';

export interface IQuiz {
    _id: string;
    title: string;
    course: ICourse;
    chapter: IChapter;
    questions: IQuizQuestion[];
    config?: IQuizConfig;
    results?: IUserQuizResult[];
}

export interface IUserQuizResult {
    _id?: string;
    quiz?: string;
    user?: string;
    score: number;
}

export interface IQuizQuestion {
    _id: string;
    title?: string;
    type?: IQuizType;
    answers?: IQuizAnswer[];
    units: (string | IUnit)[];
}

export enum QuestionTypeEnum {
    SINGLE = 'single',
    MULTIPLE = 'multiple',
    INPUT = 'input',
}

export interface IQuizType {
    _id: string;
    title: QuestionTypeEnum;
}

export interface IQuizAnswer {
    _id: string;
    title: string;
    isCorrect: boolean;
    question: string;
}

export interface IQuizAnswerRequest {
    answers: IQuizAnswer[];
}

export interface IQuizConfig {
    attempts: number;
    duration: string;
    visibilityRange: VisibilityRange;
}

export type VisibilityRange = {
    start: string;
    end: string;
};

export interface IQuizResultsRequest {
    quizId: string;
    answers: Pick<IQuizQuestion, '_id' | 'answers'>[];
}

export interface IQuizFormResult {
    [key: string]: IQuizAnswer[];
}