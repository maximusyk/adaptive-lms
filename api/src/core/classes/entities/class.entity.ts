import { Course } from '@courses/entities/course.entity';
import { IClass } from '@general-types/index.types';
import { User } from '@users/entities/user.entity';
import { model, Model, Schema, Types } from 'mongoose';

const ClassSchema: Schema = new Schema<IClass, Model<IClass>>({
    title: {
        type: String,
        unique: true,
    },
    students: [
        {
            ref: 'users',
            type: Types.ObjectId,
        },
    ],
    courses: [
        {
            ref: 'courses',
            type: Types.ObjectId,
        },
    ],
});

ClassSchema.pre(/remove|[d,D]elete/, async function(next) {
    await Course.updateMany(
        { classes: this._id },
        { $pull: { classes: this._id } },
        { multi: true },
    ).exec();
    await User.updateMany(
        { class: this._id },
        { $set: { class: null } },
        { multi: true },
    ).exec();
    next();
});

export const Class = model('classes', ClassSchema);
