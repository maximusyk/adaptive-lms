import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import CourseController from './course.controller';

const { create, getAll, getOne, remove, update } = CourseController;

const router = Router();

router.post(
    '/',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    create,
);
router.get('/:id', authMiddleware, rolesMiddleware(), getOne);
router.patch(
    '/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    update,
);
router.delete(
    '/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    remove,
);
router.get('/', authMiddleware, rolesMiddleware(), getAll);

export default router;
