import { IQuizAnswer } from '@general-types/index.types';
import { model, Schema } from 'mongoose';

const QuizAnswerSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'quiz_questions',
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'quizzes',
        required: true,
    },
});

export const QuizAnswer = model<IQuizAnswer>(
    'quiz_answers',
    QuizAnswerSchema,
);
