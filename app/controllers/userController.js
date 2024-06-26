const userService = require('../services/userService');
const admin = require('../config/firebase');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if user already exists in Firebase
        let existingUser;
        try {
            existingUser = await admin.auth().getUserByEmail(email);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                existingUser = null;
            } else {
                throw error;
            }
        }

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password: hashedPassword, // Store the hashed password
        });

        // Create user document in MongoDB
        const userData = {
            uid: userRecord.uid,
            email,
            password: hashedPassword, // Store the hashed password
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const user = await userService.createUser(userData);

        res.status(201).json({ user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserByEmail = async (req, res) => {
    const { email } = req.body;
    console.log("email: " + email);
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      res.status(200).json(userRecord.toJSON());
    } catch (error) {
        if (error.errorInfo.code === 'auth/user-not-found') {
            // Return null if the user is not found
            return res.status(404).json(null);
        } else {
            // Handle other errors
            console.error('Error fetching user by email:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const updateUser = async (req, res) => {
    try {
        // Extract userId, email, and new password from request body
        const { userId, email, password } = req.body;

        // Retrieve firebase based on _id from MongoDB
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password in Firebase Authentication
        await admin.auth().updateUser(user.uid, {
            email,
            password: hashedPassword,
        });

        // Update user document in MongoDB
        const userData = {
            password: hashedPassword,
            updatedAt: new Date(),
        };

        const updatedUser = await userService.updateUser(userId, userData);

        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Retrieve firebase based on _id from MongoDB
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete user from Firebase Authentication
        await admin.auth().deleteUser(user.uid);

        // Delete user document from MongoDB
        await userService.deleteUser(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
};
