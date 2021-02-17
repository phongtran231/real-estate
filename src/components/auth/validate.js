import { body } from "express-validator";

export const loginValidate = [
  body('email').isEmail().notEmpty().withMessage('email required'),
  body('password').notEmpty().withMessage('password required')
]
