import authMiddleware from '@middlewares/auth.middleware';
import rolesMiddleware from '@middlewares/roles.middleware';
import { Router } from 'express';
import UserController from './user.controller';

const { create, getAll, getOne, remove, update } = UserController;

const userRouter = Router();

userRouter.post(
    '/',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    create,
);
userRouter.get('/:id', authMiddleware, rolesMiddleware(), getOne);
userRouter.patch(
    '/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    update,
);
userRouter.delete(
    '/:id',
    authMiddleware,
    rolesMiddleware(['admin', 'instructor']),
    remove,
);
userRouter.get('/', authMiddleware, rolesMiddleware(), getAll);

export default userRouter;
