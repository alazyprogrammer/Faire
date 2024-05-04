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

module.exports = {
  createTask,
};
