import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.create(req.body);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.update({
                userData: { _id: req.params.id, ...req.body },
            });
            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.getAll();

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.getOne({
                userData: { _id: req.params.id },
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.remove({
                userData: { _id: req.params.id },
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new UserController();
