import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import UnitController from './unit.controller';

const { create, getAll, getOne, remove, update, getByLecture, getByChapter } =
    UnitController;

const router = Router();

router.post(
    '/',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    create,
);
router.get(
    '/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    getOne,
);
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
router.get(
    '/',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    getAll,
);
router.get(
    '/lecture/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    getByLecture,
);
router.get(
    '/chapter/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    getByChapter,
);

export default router;
