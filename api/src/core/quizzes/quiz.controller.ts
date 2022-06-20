import { NextFunction, Request, Response } from 'express';
import QuizService from './quiz.service';
import { IUser } from '@general-types/index.types';

class QuizController {
    async create({ body, files }: Request, res: Response, next: NextFunction) {
        try {
            const quiz = await QuizService.create(
                body,
                files as Express.Multer.File[],
            );

            return res.status(201).json(quiz);
        } catch ( error ) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await QuizService.update({
                _id: req.params.id,
                ...req.body,
            });

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getQuestionsByQuizId(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const questions = await QuizService.getQuestionsByQuizId(req.user as IUser, req.params.id);

            return res.status(200).json(questions);
        } catch ( error ) {
            next(error);
        }
    }

    async updateQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const question = await QuizService.updateQuestion({
                _id: req.params.id,
                ...req.body,
            });

            return res.status(200).json(question);
        } catch ( error ) {
            next(error);
        }
    }

    async updateAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const answers = await QuizService.updateAnswers({
                _id: req.params.questionId,
                ...req.body,
            });

            return res.status(200).json(answers);
        } catch ( error ) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await QuizService.getAll();

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
            const result = await QuizService.getOne(id);

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
            const result = await QuizService.remove(id);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async getQuestionsOnly(
        { params: { id } }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await QuizService.getQuestionsOnly(id);

            return res.status(result.status).json(result.body);
        } catch ( error ) {
            next(error);
        }
    }

    async checkResults(
        { body, params, user }: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const result = await QuizService.checkResults(params.id, body, user as IUser);

            return res.status(200).json({ result });
        } catch ( error ) {
            next(error);
        }
    }
}

export default new QuizController();
