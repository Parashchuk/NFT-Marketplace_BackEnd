import { body } from 'express-validator';

export const registerValidate = [
    body('username', 'Username at least must contains 3 symbols').isLength({ min: 3 }),
    body('email', 'Invalid email').isLength({ min: 3 }).isEmail(),
    body('password', 'Password at least must contains 3 symbols').isLength({ min: 3 }),
];

export const loginValidate = [
    body('email', 'Invalid email').isLength({ min: 3 }).isEmail(),
    body('password', 'Password at least must contains 3 symbols').isLength({ min: 3 }),
];
