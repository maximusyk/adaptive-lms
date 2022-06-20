import { ValidationError } from 'express-validator';

export class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: any = {}) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized');
    }

    static ForbiddenError() {
        return new ApiError(403, 'Forbidden');
    }

    static NotFoundError() {
        return new ApiError(404, 'Not found');
    }

    static ConflictError() {
        return new ApiError(409, 'Conflict');
    }

    static InternalServerError() {
        return new ApiError(500, 'Internal server error');
    }

    static BadGateway() {
        return new ApiError(502, 'Bad gateway');
    }

    static GatewayTimeout() {
        return new ApiError(504, 'Gateway timeout');
    }

    static UnsupportedMediaType() {
        return new ApiError(415, 'Unsupported media type');
    }

    static BadRequest(message: string) {
        return new ApiError(400, message);
    }

    static ValidationError(errors: ValidationError[]) {
        console.log(errors.map(({ param, msg }) => ({ param, msg })));
        return new ApiError(422, 'Validation error', {
            errors: errors.map(({ param, msg }) => ({ param, msg })),
        });
    }
}
