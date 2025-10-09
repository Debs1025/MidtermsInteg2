const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { gradeValidationRules } = require('../validators/gradeValidator');
const { validationResult } = require('express-validator');
const { isTeacher, isStudent } = require('../middleware/auth');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.post(
  '/api/grades',
  isTeacher,
  gradeValidationRules,
  validate,
  gradeController.createGrade
);

router.put(
  '/api/grades/:id',
  isTeacher,
  gradeValidationRules,
  validate,
  gradeController.updateGrade
);

router.delete(
  '/api/grades/:id',
  isTeacher,
  gradeController.deleteGrade
);

router.get(
  '/api/grades',
  isStudent,
  gradeController.getGrades
);

module.exports = router;