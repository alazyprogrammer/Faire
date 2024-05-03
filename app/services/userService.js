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

module.exports = {
    createUser,
};
