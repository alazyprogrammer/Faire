// Switch to the database where you want to create the collections (e.g., "mydatabase")
const conn = new Mongo();
const db = conn.getDB("faire-db");

// Create the "User" collection with the specified fields
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["uid", "email", "password", "createdAt", "updatedAt"],
      properties: {
        uid: { bsonType: "string" },
        email: { bsonType: "string" },
        password: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create the "Task" collection with the specified fields
db.createCollection("tasks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "status", "createdAt", "updatedAt", "userId"],
      properties: {
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        status: { bsonType: "string", enum: ["TODO", "IN_PROGRESS", "COMPLETED"] },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        userId: { bsonType: "string" }
      }
    }
  }
});
