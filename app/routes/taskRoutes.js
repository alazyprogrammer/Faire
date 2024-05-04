const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const { validateCreateTask, validateUpdateTaskStatus, validateDeleteTask } = require('../validators/taskValidator');
const taskController = require('../controllers/taskController');

// Protected route that requires authentication and validates task data
router.post('/create', authenticateUser, validateCreateTask, taskController.createTask);

// Route to get task by taskId
router.get('/:taskId', authenticateUser, taskController.getTaskById);

// Route to update task status
router.put('/status', authenticateUser, validateUpdateTaskStatus, taskController.updateTaskStatus);

// Route to delete task by taskId
router.delete('/:taskId', validateDeleteTask, taskController.deleteTask);

module.exports = router;
