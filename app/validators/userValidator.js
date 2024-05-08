const { body, validationResult } = require('express-validator');

const validateCreateUser = [
	body('email').isEmail().withMessage('Invalid email format'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
  }
];

const validateGetUserByEmail = [
	body('email').isEmail().withMessage('Invalid email format'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
  }
];

module.exports = {
  validateCreateUser,
  validateGetUserByEmail,
};
