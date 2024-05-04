// services/taskService.js
const taskRepository = require('../repositories/taskRepository');

const createTask = async (taskData) => {
  try {
    const task = await taskRepository.createTask(taskData);
    return task;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId) => {
  try {
      const task = await taskRepository.getTaskById(taskId);
      return task;
  } catch (error) {
      throw error;
  }
};

const getTasksByUserId = async (userId) => {
  try {
      const tasks = await taskRepository.getTasksByUserId(userId);
      return tasks;
  } catch (error) {
      throw error;
  }
};

const updateTaskStatus = async (taskId, status) => {
  try {
    const updatedTask = await taskRepository.updateTaskStatus(taskId, status, { new: true });
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const result = await taskRepository.deleteTask(taskId);
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
