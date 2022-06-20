import { ApiError } from '@exceptions/api-error.exception';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '@general-types/index.types';

export default function(roles: string[] | string = []) {
    if ( typeof roles === 'string' ) {
        roles = [ roles ];
    }

    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            if ( roles.length && !req.user ) throw ApiError.UnauthorizedError();

            const reqUser = req.user as IUser;

            if ( roles.length && !roles.includes(reqUser.role as string) )
                return next(ApiError.ForbiddenError());

            next();
        } catch ( error ) {
            return next(ApiError.UnauthorizedError());
        }
    };
}
