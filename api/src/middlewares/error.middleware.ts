import { ApiError } from '@exceptions/api-error.exception';
import { Request, Response } from 'express';

export const errorMiddleware = (
    error: Error | ApiError,
    req: Request | Response,
    res: Response,
) => {
    const status = error instanceof ApiError ? error.status : 500;
    const message = error.message || 'Internal server error';

    console.log(error);

    if ( 'status' in req ) {
        const response = req as Response;
        return response.status(status).json({
            status,
            message,
            ...(error instanceof ApiError && { errors: error.errors }),
        });
    }

    return res.status(status).json({
        status,
        message,
        ...(error instanceof ApiError && { errors: error.errors }),
    });
};
