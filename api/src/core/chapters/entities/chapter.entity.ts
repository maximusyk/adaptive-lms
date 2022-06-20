import { Course } from '@courses/entities/course.entity';
import { IChapter } from '@general-types/index.types';
import { Lecture } from '@lectures/entities/lecture.entity';
import { Quiz } from '@quizzes/entities/quiz.entity';
import { model, Model, Schema, Types } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const ChapterSchema: Schema = new Schema<IChapter, Model<IChapter>>(
    {
        title: { type: String, required: true },
        course: { type: Types.ObjectId, ref: 'courses' },
        subdivisions: [
            {
                item: { type: Types.ObjectId, refPath: 'subdivisions.subdivisionType', autopopulate: true },
                subdivisionType: {
                    type: String,
                    required: true,
                    enum: [ 'lectures', 'quizzes' ],
                },
            },
        ],
    },
    { strict: false },
);

ChapterSchema.plugin(mongooseAutoPopulate);

ChapterSchema.pre(/remove|[d,D]elete/, async function(next) {
    await Course.updateMany(
        { chapters: this._id },
        { $pull: { chapters: this._id } },
    ).exec();
    await Lecture.deleteMany({ chapter: this._id }).exec();
    await Quiz.deleteMany({ chapter: this._id }).exec();
    next();
});

export const Chapter = model('chapters', ChapterSchema);
