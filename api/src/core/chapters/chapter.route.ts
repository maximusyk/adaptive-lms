import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import ChapterController from './chapter.controller';

const router = Router();
const { create, getAll, getOne, remove, update } = ChapterController;

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
