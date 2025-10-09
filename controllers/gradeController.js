const gradeService1 = require('../services/gradeService1');
const gradeService2 = require('../services/gradeService2');

async function createGrade(req, res) {
  try {
    const grade = await gradeService1.assignGrade(req.body);
    res.status(201).json(grade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function getGrades(req, res) {
  try {
    const grades = await require('../models/gradeModel').find({ studentId: req.user.id });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function updateGrade(req, res) {
  try {
    const updatedGrade = await gradeService2.updateGrade(req.params.id, req.body);
    if (!updatedGrade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(updatedGrade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function deleteGrade(req, res) {
  try {
    const deletedGrade = await gradeService2.deleteGrade(req.params.id);
    if (!deletedGrade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createGrade,
  getGrades,
  updateGrade,
  deleteGrade
};