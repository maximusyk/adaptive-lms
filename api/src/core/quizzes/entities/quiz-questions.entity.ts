import { IQuizQuestion } from '@general-types/index.types';
import { model, Schema, Types } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const QuizQuestionSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: Types.ObjectId,
        ref: 'quiz_types',
        autopopulate: true,
    },
    answers: [
        {
            type: Types.ObjectId,
            ref: 'quiz_answers',
            autopopulate: true,
        },
    ],
    units: [
        {
            ref: 'units',
            type: Types.ObjectId,
        },
    ],
    quiz: {
        type: Types.ObjectId,
        ref: 'quizzes',
        required: true,
    },
});

QuizQuestionSchema.plugin(mongooseAutoPopulate);

export const QuizQuestion = model<IQuizQuestion>(
    'quiz_questions',
    QuizQuestionSchema,
);
