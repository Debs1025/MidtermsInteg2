const { body, validationResult } = require('express-validator');

const subjectValidator = [
  body('id')
    .notEmpty().withMessage('Subject ID is required.')
    .isString().withMessage('Subject ID must be a string.'),
  body('name')
    .notEmpty().withMessage('Subject name is required.')
    .isString().withMessage('Subject name must be a string.'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string.'),
  body('createdBy')
    .notEmpty().withMessage('CreatedBy is required.')
    .isMongoId().withMessage('CreatedBy must be a valid user ID.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { subjectValidator };