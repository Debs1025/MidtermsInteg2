import { body } from 'express-validator';

export const registerValidators = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/[A-Za-z]/).matches(/[0-9]/),
  body('confirmPassword').custom((value, { req }) => value === req.body.password),
  body('userType').isIn(['Student', 'Teacher', 'Parent']),
  body('teacherCode').custom((value, { req }) => {
    if (req.body.userType === 'Teacher') {
      return typeof value === 'string' && value.trim().length > 0;
    }
    return true;
  })
];


