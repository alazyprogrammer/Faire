const admin = require('firebase-admin');
const { FIREBASE_SERVICE_ACCOUNT_KEY_PATH } = require('../constants');

const serviceAccount = require(FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
