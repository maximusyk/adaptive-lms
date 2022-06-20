import { Chapter } from '@chapters/entities/chapter.entity';
import { IQuiz } from '@general-types/index.types';
import { model, Schema, Types } from 'mongoose';
import { QuizAnswer } from './quiz-answers.entity';
import { QuizQuestion } from './quiz-questions.entity';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const QuizSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    course: {
        ref: 'courses',
        type: Types.ObjectId,
    },
    chapter: {
        type: Types.ObjectId,
        ref: 'chapters',
    },
    questions: [
        {
            type: Types.ObjectId,
            ref: 'quiz_questions',
            autopopulate: true,
        },
    ],
    config: {
        attempts: {
            type: Number,
            default: 1,
        },
        duration: {
            type: String,
        },
        visibilityRange: {
            start: {
                type: Date,
            },
            end: {
                type: Date,
            },
        },
    },
    results: [ {
        type: Types.ObjectId,
        ref: 'user_quiz_results',
        autopopulate: true,
    } ],
});
QuizSchema.plugin(mongooseAutoPopulate);

QuizSchema.pre(/remove|[d,D]elete/, async function(next) {
    await Chapter.updateMany(
        { subdivisions: { item: this._id } },
        { $pull: { subdivisions: { item: this._id } } },
        { multi: true },
    ).exec();
    await QuizAnswer.deleteMany({ quiz: this._id }).exec();
    await QuizQuestion.deleteMany({ quiz: this._id }).exec();
    next();
});

export const Quiz = model<IQuiz>('quizzes', QuizSchema);
