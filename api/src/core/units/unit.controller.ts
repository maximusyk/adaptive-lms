import { NextFunction, Request, Response } from 'express';
import UnitService from './unit.service';

class UnitController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.create(req.body);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.update({
                _id: req.params.id,
                ...req.body,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.getAll();

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getByLecture(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.getByLecture({
                _id: req.params.id,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getByChapter(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.getByChapter({
                _id: req.params.id,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.getOne({ _id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UnitService.remove({ _id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new UnitController();
