import { Class } from '@classes/entities/class.entity';
import { Course } from '@courses/entities/course.entity';
import { IUser } from '@general-types/index.types';
import { model, Schema, Types } from 'mongoose';

const UserSchema: Schema = new Schema({
    profile_name: {
        type: String,
        required: true,
    },
    profile_picture: { type: String },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'student',
        enum: [ 'student', 'instructor', 'admin' ],
    },
    progress: [
        {
            course: {
                type: Types.ObjectId,
                ref: 'courses',
            },
            value: {
                type: Number,
                default: 0,
            },
        },
    ],
    class: {
        ref: 'classes',
        type: Types.ObjectId,
    },
});
UserSchema.pre('save', function(next) {
    if ( !this.username || !this.username.length )
        this.set({
            username: this.profile_name.toLowerCase().replace(' ', '.'),
        });
    next();
});
UserSchema.pre(/remove|[d,D]elete/, async function(next) {
    if ( this.role === 'student' ) {
        await Class.updateMany(
            { students: this._id },
            { $pull: { students: this._id } },
            { multi: true },
        ).exec();
        await Course.updateMany(
            { students: this._id },
            { $pull: { students: this._id } },
            { multi: true },
        ).exec();
        return next();
    }
    if ( this.role === 'instructor' ) {
        await Course.updateMany(
            { instructor: this._id },
            { instructor: '' },
            { multi: true },
        ).exec();
        return next();
    }
});

export const User = model<IUser>('users', UserSchema);
