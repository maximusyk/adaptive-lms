import { IKeyword } from '@general-types/index.types';
import { Unit } from '@units/entities/unit.entity';
import { model, Schema } from 'mongoose';

const KeywordSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

KeywordSchema.pre(/remove|[d,D]elete/, async function(next) {
    await Unit.updateMany(
        { keywords: String(this._id) },
        { $pull: { keywords: { item: this._id } } },
        { multi: true },
    ).exec();
    next();
});

export const Keyword = model<IKeyword>('keywords', KeywordSchema);
