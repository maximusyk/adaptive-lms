import { NextFunction, Request, Response } from 'express';
import CourseService from './course.service';
import { IUser } from '@general-types/index.types';

class CourseController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CourseService.create(req.body);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CourseService.update({
                id: req.params.id,
                courseData: req.body,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.user);
            const courses = await CourseService.getAll(req.user as IUser);
            console.log(courses);

            return res.status(200).json(courses);
        } catch ( error ) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CourseService.getOne({ id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CourseService.remove({ id: req.params.id });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }
}

export default new CourseController();
