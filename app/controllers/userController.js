const userService = require('../services/userService');
const admin = require('../config/firebase');

const createUser = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if user already exists in Firebase
        const existingUser = await admin.auth().getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        console.log("User Id: " + userRecord);

        // Create user document in MongoDB
        const userData = {
            userId: userRecord.uid,
            email,
            password, // Note: It's highly recommended not to store passwords in plain text. Use hashing instead.
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const user = await userService.createUser(userData);

        res.status(201).json({user});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
};
