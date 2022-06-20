import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import QuizController from './quiz.controller';

const {
    create,
    getAll,
    getOne,
    remove,
    update,
    updateQuestion,
    getQuestionsByQuizId,
    updateAnswers,
    checkResults,
} = QuizController;

const router = Router();

router.post(
    '/',
    authMiddleware,
    rolesMiddleware([ 'admin', 'instructor' ]),
    create,
);
router.get('/:id', authMiddleware, rolesMiddleware(), getOne);
router.patch(
    '/:id',
    authMiddleware,
    rolesMiddleware([ 'admin', 'instructor' ]),
    update,
);
router.patch(
    '/question/:id',
    authMiddleware,
    rolesMiddleware([ 'admin', 'instructor' ]),
    updateQuestion,
);
router.get(
    '/question/:id',
    authMiddleware,
    rolesMiddleware([ 'admin', 'student' ]),
    getQuestionsByQuizId,
);
router.patch(
    '/answers/:questionId',
    authMiddleware,
    rolesMiddleware([ 'admin', 'instructor' ]),
    updateAnswers,
);
router.delete(
    '/:id',
    authMiddleware,
    rolesMiddleware([ 'admin', 'instructor' ]),
    remove,
);

router.post(
    '/result/:id',
    authMiddleware,
    rolesMiddleware([ 'admin', 'student' ]),
    checkResults,
);

router.get('/', authMiddleware, rolesMiddleware(), getAll);

export default router;
