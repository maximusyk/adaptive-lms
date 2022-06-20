import { NextFunction, Request, Response } from 'express';
import KeywordService from './keyword.service';

class KeywordController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await KeywordService.create(req.body);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await KeywordService.update({
                id: req.params.id,
                keywordData: req.body,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await KeywordService.getAll();

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await KeywordService.getOne({ id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await KeywordService.remove({ id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new KeywordController();
