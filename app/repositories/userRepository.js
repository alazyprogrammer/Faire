const User = require('../models/User');

const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error(`Error retrieving user by userId: ${error.message}`);
    }
};

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
