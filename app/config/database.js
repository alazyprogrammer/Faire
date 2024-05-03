// config/database.js
const mongoose = require('mongoose');
const { DB, LOCALHOST } = require('../constants');

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB.SERVICE}://${LOCALHOST}:${DB.PORT}/${DB.NAME}`);
    console.log(`${DB.CONNECTION_SUCCESSFUL}`);
  } catch (error) {
    console.error(`${DB.CONNECTION_FAILED}`, error);
    process.exit(1);
  }
};

module.exports = connectDB;
