import { NextFunction, Request, Response } from 'express';
import ChapterService from './chapter.service';

class ChapterController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ChapterService.create(req.body);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ChapterService.update({
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
            const chapters = await ChapterService.getAll();

            return res.status(200).json(chapters);
        } catch ( error ) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const chapter = await ChapterService.getOne({ id: req.params.id });

            return res.status(200).json(chapter);
        } catch ( error ) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ChapterService.remove({ id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new ChapterController();
