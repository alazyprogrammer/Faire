const Task = require('../models/Task');

const createTask = async (taskData) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId) => {
    try {
        const task = await Task.findById(taskId);
        return task;
    } catch (error) {
        throw error;
    }
};

const getTasksByUserId = async (userId) => {
    try {
        const tasks = await Task.find({userId});
        return tasks;
    } catch (error) {
        throw error;
    }
};

const updateTaskStatus = async (taskId, status) => {
    try {
      // Find task by ID and update its status
      const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: {status} }, { new: true });
  
      if (!updatedTask) {
        throw new Error('Task not found');
      }
  
      return updatedTask;
    } catch (error) {
      throw error;
    }
};

const deleteTask = async (taskId) => {
    try {
      const result = await Task.findByIdAndDelete(taskId);
      return result;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
};

module.exports = {
  createTask,
  getTaskById,
  getTasksByUserId,
  updateTaskStatus,
  deleteTask,
};