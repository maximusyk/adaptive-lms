import { Chapter } from '@chapters/entities/chapter.entity';
import { Class } from '@classes/entities/class.entity';
import { ICourse } from '@general-types/index.types';
import { User } from '@users/entities/user.entity';
import { model, Model, Schema, Types } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const CourseSchema: Schema = new Schema<ICourse, Model<ICourse>>({
    title: {
        type: String,
        required: true,
    },
    instructor: {
        ref: 'users',
        type: Types.ObjectId,
        required: true,
        autopopulate: true,
    },
    chapters: [
        {
            type: Types.ObjectId,
            ref: 'chapters',
            autopopulate: true,
        },
    ],
    classes: [
        {
            ref: 'classes',
            type: Types.ObjectId,
            autopopulate: true,
        },
    ],
    students: [
        {
            ref: 'users',
            type: Types.ObjectId,
            autopopulate: true,
        },
    ],
});

CourseSchema.plugin(mongooseAutoPopulate);

CourseSchema.pre(/remove|[d,D]elete/, async function(next) {
    await Chapter.deleteMany({ course: this._id }).exec();
    await Class.updateMany(
        { course: this._id },
        { $pull: { courses: this._id } },
        { multi: true },
    ).exec();
    await User.updateMany(
        { progress: { course: this._id } },
        { $pull: { progress: { course: this._id } } },
        { multi: true },
    ).exec();
    next();
});

export const Course = model('courses', CourseSchema);
