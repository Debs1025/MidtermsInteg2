const Grade = require('../models/Grade');

// ✅ CREATE
exports.createGrade = async (req, res) => {
  try {
    const { studentId, subjectId, gradeValue } = req.body;

    const grade = await Grade.create({ studentId, subjectId, gradeValue });
    res.status(201).json({ message: 'Grade created successfully', grade });
  } catch (error) {
    res.status(500).json({ message: 'Error creating grade', error: error.message });
  }
};

// ✅ READ (All)
exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('studentId subjectId');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
};

// ✅ READ (One)
exports.getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id).populate('studentId subjectId');
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grade', error: error.message });
  }
};

// ✅ UPDATE
exports.updateGrade = async (req, res) => {
  try {
    const { gradeValue } = req.body;

    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      { gradeValue },
      { new: true }
    );

    if (!updatedGrade) return res.status(404).json({ message: 'Grade not found' });

    res.status(200).json({ message: 'Grade updated successfully', updatedGrade });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade', error: error.message });
  }
};

// ✅ DELETE
exports.deleteGrade = async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) return res.status(404).json({ message: 'Grade not found' });

    res.status(200).json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grade', error: error.message });
  }
};
