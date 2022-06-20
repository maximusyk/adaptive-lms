import { ApiError } from '@exceptions/api-error.exception';
import { IUser } from '@general-types/index.types';
import tokenService from '@tokens/token.service';
import { User } from '@users/entities/user.entity';
import bcrypt from 'bcrypt';

class AuthService {
    async login(username: string, password: string) {
        const user = (await User.findOne({ username }).exec()) as IUser;
        if ( !user ) throw ApiError.BadRequest('User not found');

        const isPasswordValid = bcrypt.compareSync(
            password,
            user.password as string,
        );
        if ( !isPasswordValid ) throw ApiError.BadRequest('Wrong password');

        const tokens = tokenService.generateTokens({
            _id: user._id,
            username: user.username as string,
            role: user.role as string,
        });

        await tokenService.saveToken(user._id, tokens.refreshToken);

        return { ...tokens, user: user._id };
    }

    async logout(refreshToken: string) {
        return tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if ( !refreshToken ) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if ( !userData || !tokenFromDb ) throw ApiError.UnauthorizedError();

        const user = (await User.findById(userData._id).exec()) as IUser;
        const tokens = tokenService.generateTokens({
            _id: user._id,
            username: user.username as string,
            role: user.role as string,
        });

        await tokenService.saveToken(user._id, tokens.refreshToken);

        return { ...tokens, user: user._id };
    }
}

export default new AuthService();
