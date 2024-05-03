const userRepository = require('../repositories/userRepository');

const createUser = async (userData) => {
    try {
        // Perform any additional logic/validation here if needed
        const user = await userRepository.createUser(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        return user;
    } catch (error) {
        throw new Error(`Error getting user by userId: ${error.message}`);
    }
};

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await userRepository.updateUser(userId, userData);
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        await userRepository.deleteUser(userId);
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
