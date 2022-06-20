// import { validateRequest } from '@middlewares/validation.middleware';
import { Router } from 'express';
import authController from './auth.controller';
// import authValidate from './auth.validate';

const router = Router();

const { login, logout, refresh } = authController;

// router.post('/login', validateRequest(authValidate.login), login);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);

export default router;
