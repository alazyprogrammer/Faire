const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateCreateUser } = require('../validators/userValidator');

// Route for creating a new user
router.post('/signup', validateCreateUser, userController.createUser);

module.exports = router;
