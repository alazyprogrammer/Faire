// constants.js
module.exports = {
    LOCALHOST: 'db',
    DB: {
        SERVICE: "mongodb",
        NAME: "faire-db",
        PORT: "27017",
        CONNECTION_SUCCESSFUL: "MongoDB connected",
        CONNECTION_FAILED: "MongoDB connection failed"
    },
    TASK_STATUS: {
      TODO: 'TODO',
      IN_PROGRESS: 'IN_PROGRESS',
      DONE: 'DONE',
    },
    ERROR_MESSAGES: {
      TITLE_REQUIRED: 'Title is required',
      DESCRIPTION_REQUIRED: 'Description is required',
      INTERNAL_SERVER_ERROR: 'Internal Server Error',
    },
    FIREBASE_SERVICE_ACCOUNT_KEY_PATH: '../faire-task-list-firebase-adminsdk-j9rf0-09555460de.json',
  };
  