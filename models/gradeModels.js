const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  gradeValue: {
    type: Number,
    required: true
  }
});

function isTeacher(req, res, next) {
  if (req.user && req.user.role === 'teacher') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Teachers only.' });
}

function isStudent(req, res, next) {
  if (req.user && req.user.role === 'student') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Students only.' });
}

module.exports = { 
  model: mongoose.model('Grade', gradeSchema),
  isTeacher,
  isStudent 
};