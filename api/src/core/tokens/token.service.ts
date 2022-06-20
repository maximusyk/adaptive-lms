import jwt from 'jsonwebtoken';
import { Token } from './entities/token.entity';

interface ITokenData {
    _id: string;
    username: string;
    role: string;
}

class TokenService {
    generateTokens(payload: ITokenData) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: '30m' },
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '30d' },
        );

        return { accessToken, refreshToken };
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await Token.findOne({ user: userId }).exec();
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return Token.create({ user: userId, refreshToken });
    }

    async removeToken(refreshToken: string) {
        return Token.deleteOne({ refreshToken }).exec();
    }

    async findToken(refreshToken: string) {
        return Token.findOne({ refreshToken }).exec();
    }

    validateRefreshToken(refreshToken: string): ITokenData | null {
        try {
            return jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET as string,
            ) as ITokenData;
        } catch (error) {
            return null;
        }
    }

    validateAccessToken(accessToken: string): ITokenData | null {
        try {
            return jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_SECRET as string,
            ) as ITokenData;
        } catch (error) {
            return null;
        }
    }
}

export default new TokenService();
