import { ApiError } from '@exceptions/api-error.exception';
import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validateRequest = (validateFields: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validateField of validateFields) {
            await validateField.run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorObject = ApiError.ValidationError(errors.array());
            res.status(errorObject.status).json(errorObject);
        }

        next();
    };
};
