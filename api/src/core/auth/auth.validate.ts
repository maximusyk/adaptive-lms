import { body } from 'express-validator';

export default {
    login: [
        body('username')
            .exists()
            .withMessage('Username required')
            .isLength({ min: 5 })
            .withMessage('Username must be at least 5 characters'),
        //     body('username').exists().isEmail(),
        // ]),
        body('password')
            .exists()
            .withMessage('Password required')
            .isLength({ min: 6, max: 32 })
            .withMessage('Password must be at least 6 characters'),
    ],
};
