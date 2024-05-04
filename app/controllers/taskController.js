const { TASK_STATUS } = require('../constants');
const taskService = require('../services/taskService');
const userService = require('../services/userService');

const createTask = async (req, res) => {
  try {
    // Extract task data from request body
    const { userId, title, description } = req.body;

    // Set createdAt and updatedAt fields
    const status = TASK_STATUS.TODO;
    const createdAt = new Date();
    const updatedAt = new Date();

    const user = await userService.getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Create task object
    const taskData = {
      title,
      description,
      status,
      createdAt,
      updatedAt,
      userId
    };

    // Call service to create task
    const task = await taskService.createTask(taskData);

    // Respond with created task
    res.status(201).json(task);
  } catch (error) {
    // Handle errors
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTaskById = async (req, res) => {
  try {
      const taskId = req.params.taskId;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
  } catch (error) {
      console.error('Error retrieving task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userService.getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve all tasks
    const tasks = await taskService.getTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTaskStatus = async (req, res) => {
  try {

    // Extract task ID and status from request body
    const { taskId, status } = req.body;

    const task = await taskService.getTaskById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Update task status
    const updatedTask = await taskService.updateTaskStatus(taskId, status);

    res.json({ message: 'Task status updated successfully', updatedTask });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await taskService.getTaskById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Delete task
    await taskService.deleteTask(taskId);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTask,
  getTaskById,
  getTasksByUserId,
  updateTaskStatus,
  deleteTask,
};