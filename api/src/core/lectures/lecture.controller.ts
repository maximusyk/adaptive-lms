import { NextFunction, Request, Response } from 'express';
import LectureService from './lecture.service';

class LectureController {
    async create({ body, files }: Request, res: Response, next: NextFunction) {
        try {
            const result = await LectureService.create({
                ...body,
                content: files as Express.Multer.File[],
            });

            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update({ body, params }: Request, res: Response, next: NextFunction) {
        try {
            const result = await LectureService.update({
                ...body,
                id: params.id,
            });

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async editLecture(
        { params, files }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await LectureService.editLecture({
                id: params.id,
                content: files as Express.Multer.File[],
            });

            return res.status(200).json({ fileId: result.fileId });
        } catch (error) {
            next(error);
        }
    }

    async getOne(
        { params: { id } }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await LectureService.getOne({ id });

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async readLecture(
        { params: { id } }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await LectureService.readLecture(id);

            return result.pipe(res);
        } catch (error) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await LectureService.getAll();

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async remove(
        { params: { id } }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await LectureService.remove(id);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new LectureController();
