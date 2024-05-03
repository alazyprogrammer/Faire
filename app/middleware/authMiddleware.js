const admin = require('../config/firebase');

// Middleware function to authenticate user using Firebase
const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const idToken = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
