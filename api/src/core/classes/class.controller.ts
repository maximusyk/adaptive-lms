import { NextFunction, Request, Response } from 'express';
import ClassService from './class.service';

class ClassController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ClassService.create(req.body);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ClassService.update({
                id: req.params.id,
                data: req.body,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ClassService.getAll();

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getOne(
        { params: { id } }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await ClassService.getOne({ id });
            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async remove(
        { params: { id } }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await ClassService.remove({ id });
            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new ClassController();
