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
            userId: userRecord.uid,
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

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        // Extract userId, email, and new password from request body
        const { email, password } = req.body;

        // Validate user in Firebase
        const existingUser = await admin.auth().getUser(userId);
        if (!existingUser || existingUser.email !== email) {
            return res.status(404).json({ error: 'User not found or email mismatch' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password in Firebase Authentication
        await admin.auth().updateUser(userId, {
            email,
            password: hashedPassword,
        });

        // Update user document in MongoDB
        const userData = {
            password: hashedPassword,
            updatedAt: new Date(),
        };

        await userService.updateUser(userId, userData);

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate user in Firebase
        const existingUser = await admin.auth().getUser(userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete user from Firebase Authentication
        await admin.auth().deleteUser(userId);

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
    updateUser,
    deleteUser,
};
