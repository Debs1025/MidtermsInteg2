const Grade = require('../models/grade');

async function assignGrade({ id, studentId, subjectId, gradeValue }) {
  const grade = new Grade({
    id,
    studentId,
    subjectId,
    gradeValue
  });

  return await grade.save();
}

module.exports = {
  assignGrade
};

