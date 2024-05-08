const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateCreateUser, validateGetUserByEmail } = require('../validators/userValidator');

// Route for creating a new user
router.post('/signup', validateCreateUser, userController.createUser);

// Route to get user by userId
router.get('/:userId', userController.getUserById);

// Route to get user by userId
router.post('/', validateGetUserByEmail, userController.getUserByEmail);

// Route to update user credentials
router.put('/update', userController.updateUser);

// Route to delete user by userId
router.delete('/:userId', userController.deleteUser);

module.exports = router;
