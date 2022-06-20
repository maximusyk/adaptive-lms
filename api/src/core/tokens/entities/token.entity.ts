import { IToken } from '@general-types/index.types';
import { model, Schema } from 'mongoose';

const TokenSchema: Schema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
});

export const Token = model<IToken>('tokens', TokenSchema);
