import { IQuizType } from '@general-types/index.types';
import { model, Model, Schema } from 'mongoose';

const QuizTypeSchema: Schema = new Schema({
    title: {
        type: String,
        enum: [ 'single', 'multiple', 'input' ],
        required: true,
    },
});

QuizTypeSchema.statics.getIds = function(): Promise<{
    [type: string]: string;
}> {
    return this.find()
        .exec()
        .then((types: IQuizType[]) => {
            if ( !types.length )
                return Promise.resolve({ error: 'No quiz types found' });

            const objectIds: { [type: string]: string } = {};
            types.forEach(({ _id, title }) => {
                objectIds[title] = _id;
            });
            return Promise.resolve(objectIds);
        });
};

interface IQuizTypeModel extends Model<IQuizType> {
    getIds(): Promise<{ [type: string]: string }>;
}

export const QuizType: IQuizTypeModel = model<IQuizType, IQuizTypeModel>(
    'quiz_types',
    QuizTypeSchema,
);
