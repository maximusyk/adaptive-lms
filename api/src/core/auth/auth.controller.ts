import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const userData = await AuthService.login(username, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({
                accessToken: userData.accessToken,
                user: userData.user,
            });
        } catch ( error ) {
            console.log(error);
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.sendStatus(200);
        } catch ( error ) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await AuthService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new AuthController();
