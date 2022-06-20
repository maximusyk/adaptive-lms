import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    profile_name?: string;
    profile_picture?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    progress?: UserProgress[];
    class?: IClass | string;
    token?: string;
    class_name?: string;
}

export type UserProgress = {
    course: ICourse | string;
    value: number;
};

export interface IClass extends Document {
    _id: string;
    title: string;
    students: (IUser | string)[];
    courses: (ICourse | string)[];
}

export interface ICourse extends Document {
    _id: string;
    title: string;
    instructor: IUser | string;
    chapters: (IChapter | string)[];
    classes: (IClass | string)[];
    students: (IUser | string)[];
}

export interface IChapter extends Document {
    _id: string;
    title: string;
    course: ICourse | string;
    subdivisions: SubdivisionItem[];
}

export type IChapterSeed = Partial<IChapter>;
export type IClassSeed = Partial<IClass>;
export type ICourseSeed = Partial<ICourse>;
export type IUserSeed = Partial<IUser>;
export type IQuizTypeSeed = Partial<IQuizType>;

export type SubdivisionItem = {
    item: ILecture | IQuiz | string;
    subdivisionType: 'lectures' | 'quizzes';
};

export interface ILecture extends Document {
    _id: string;
    title: string;
    fileId: string;
    units: IUnit[] | string[];
    viewable: boolean;
    chapter: IChapter | string;
}

export interface IQuiz extends Document {
    _id: string;
    title: string;
    course: string;
    chapter: string;
    questions: IQuizQuestion[];
    config?: IQuizConfig;
    results?: IUserQuizResult[];
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

export interface IQuizQuestion extends Document {
    _id: string;
    title: string;
    type: IQuizType;
    answers: IQuizAnswer[];
    units: IUnit[] | string[];
    quiz: IQuiz | string;
}

export interface IQuizType extends Document {
    _id: string;
    title: 'single' | 'multiple' | 'input';
}

export interface IQuizAnswer extends Document {
    _id: string;
    title: string;
    isCorrect: boolean;
}

export interface IUnit extends Document {
    _id: string;
    title: string;
    lecture: ILecture;
    chapter: IChapter;
    course: ICourse;
    content: string;
    keywords: IKeyword[] | string[];
    cohesionRate: UnitCohesionRate[];
}

type UnitCohesionRate = {
    unit: IUnit;
    rate: number;
};

export interface IKeyword extends Document {
    title: string;
    _id: string;
}

export interface IToken extends Document {
    _id: string;
    refreshToken: string;
    user: IUser;
}

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

export interface IUserQuizResult extends Document {
    _id: string;
    quiz: IQuiz;
    user: IUser;
    score: number;
}