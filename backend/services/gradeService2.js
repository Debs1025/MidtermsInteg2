const Grade = require('../models/gradeModel');

// Update a grade by id
async function updateGrade(id, updateData) {
  return await Grade.findOneAndUpdate({ id }, updateData, { new: true });
}

// Delete a grade by id
async function deleteGrade(id) {
  return await Grade.findOneAndDelete({ id });
}

module.exports = {
  updateGrade,
  deleteGrade
};