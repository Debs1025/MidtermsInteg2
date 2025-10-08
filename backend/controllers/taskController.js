const service = require('../services/taskService');

// Create
const createTask = async (req, res) => {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json({ success: true, message: 'Task created successfully', data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Read All
const getTasks = async (req, res) => {
  try {
    const tasks = await service.getAllTasks();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Read One
const getTask = async (req, res) => {
  try {
    const task = await service.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update
const updateTask = async (req, res) => {
  try {
    const updatedTask = await service.updateTask(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Task updated successfully', data: updatedTask });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Delete
const deleteTask = async (req, res) => {
  try {
    await service.deleteTask(req.params.id);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
