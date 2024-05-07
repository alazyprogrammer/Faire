const mongoose = require('mongoose');
const { TASK_STATUS } = require('../constants');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(TASK_STATUS), 
    default: TASK_STATUS.TODO,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
