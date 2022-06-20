import { model, Schema, Types } from 'mongoose';
import { Quiz } from '@quizzes/entities/quiz.entity';
import { IUserQuizResult } from '@general-types/index.types';

const UserQuizResultEntity: Schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'users',
    },
    quiz: {
        type: Types.ObjectId,
        ref: 'quizzes',
    },
    score: {
        type: Number,
        required: true,
    },
});

UserQuizResultEntity.pre(/remove|[d,D]elete/, async function(next) {
    await Quiz.updateMany(
        { results: this._id },
        { $pull: { results: this._id } },
        { multi: true },
    ).exec();
    next();
});

export const UserQuizResult = model<IUserQuizResult>('user_quiz_results', UserQuizResultEntity);