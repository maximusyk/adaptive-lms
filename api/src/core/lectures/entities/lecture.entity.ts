import { Chapter } from '@chapters/entities/chapter.entity';
import { ILecture } from '@general-types/index.types';
import { Unit } from '@units/entities/unit.entity';
import { model, Schema, Types } from 'mongoose';

const LectureSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    fileId: {
        type: String,
    },
    units: [
        {
            ref: 'units',
            type: Types.ObjectId,
        },
    ],
    viewable: {
        type: Boolean,
        default: false,
    },
    chapter: {
        type: Types.ObjectId,
        ref: 'chapters',
    },
});

LectureSchema.pre(/remove|[d,D]elete/, async function(next) {
    await Chapter.updateMany(
        { subdivisions: { item: this._id } },
        { $pull: { subdivisions: { item: this._id } } },
        { multi: true },
    ).exec();
    await Unit.deleteMany({ chapter: this.chapter }).exec();
    next();
});

export const Lecture = model<ILecture>('lectures', LectureSchema);
