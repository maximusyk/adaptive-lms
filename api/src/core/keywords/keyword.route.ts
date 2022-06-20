import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import KeywordController from './keyword.controller';

const { create, getAll, getOne, remove, update } = KeywordController;

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

export default router;
