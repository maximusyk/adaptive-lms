import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import LectureController from './lecture.controller';

const { create, getAll, readLecture, editLecture, getOne, remove, update } =
    LectureController;

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
router.get('/', getAll);
router.get('/file/:id', authMiddleware, rolesMiddleware(), readLecture);
router.patch(
    '/file/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    editLecture,
);

export default router;
