import { IUnit } from '@general-types/index.types';
import { Lecture } from '@lectures/entities/lecture.entity';
import { QuizQuestion } from '@quizzes/entities/quiz-questions.entity';
import { model, Schema, Types } from 'mongoose';

const UnitSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    lecture: {
        type: Types.ObjectId,
        ref: 'lectures',
    },
    chapter: {
        type: Types.ObjectId,
        ref: 'chapters',
    },
    course: {
        type: Types.ObjectId,
        ref: 'courses',
    },
    content: {
        type: String,
        required: true,
    },
    keywords: [
        {
            type: Types.ObjectId,
            ref: 'keywords',
        },
    ],
    cohesionRate: [
        {
            unit: {
                type: Types.ObjectId,
                ref: 'units',
            },
            rate: { type: Number },
        },
    ],
});

UnitSchema.pre(/remove|[d,D]elete/, async function(next) {
    model('units', UnitSchema).updateOne(
        { connectivity: { unit: this._id } },
        { $pull: { connectivity: { unit: this._id } } },
        { multi: true },
    );
    await Lecture.updateMany(
        { units: String(this._id) },
        { $pull: { units: this._id } },
        { multi: true },
    ).exec();
    await QuizQuestion.updateMany(
        { units: String(this._id) },
        { $pull: { units: this._id } },
        { multi: true },
    ).exec();
    next();
});

export const Unit = model<IUnit>('units', UnitSchema);
