const { param, body, validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const { TASK_STATUS } = require('../constants');

const validateCreateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateTaskStatus = [
  body('taskId').notEmpty().withMessage('Task ID is required'),
  body('status').notEmpty().withMessage('Status is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validate task ID
    const { taskId, status } = req.body;
    if (!isValidObjectId(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Validate status
    if (!Object.values(TASK_STATUS).includes(status)) {
      return res.status(400).json({ error: 'Invalid task status' });
    }

    next();
  },
];

const validateDeleteTask = [
  param('taskId').notEmpty().withMessage('Task ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validate task ID
    const taskId = req.params.taskId;
    if (!isValidObjectId(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    next();
  },
];

module.exports = {
  validateCreateTask,
  validateUpdateTaskStatus,
  validateDeleteTask,
};
