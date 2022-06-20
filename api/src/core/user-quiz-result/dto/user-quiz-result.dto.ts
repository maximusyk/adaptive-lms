export interface IUserQuizResultCreateDto {
    userId: string;
    quizId: string;
    score: number;
}

export interface IUserQuizResultUpdateDto {
    _id: string;
    score: number;
}