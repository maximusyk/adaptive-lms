import { ApiError } from '@exceptions/api-error.exception';
import tokenService from '@tokens/token.service';
import { NextFunction, Request, Response } from 'express';

export default function(req: Request, _res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if ( !authorizationHeader ) {
            throw ApiError.UnauthorizedError();
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if ( !accessToken ) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if ( !userData ) {
            throw ApiError.UnauthorizedError();
        }

        req.user = userData;
        next();
    } catch ( error ) {
        return next();
    }
}
