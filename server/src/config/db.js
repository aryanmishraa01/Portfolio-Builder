// server/src/config/db.js
// MongoDB connection setup with automatic in-memory fallback for local dev

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_builder';
    
    // Attempt standard MongoDB connection
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB Warning] Local MongoDB connection failed (${err.message}). Starting MongoMemoryServer fallback...`);
    try {
      // In-memory MongoDB fallback ensures the server works even without local MongoDB installed
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`[MongoDB Memory Server] Connected: ${conn.connection.host}`);
    } catch (fallbackErr) {
      console.error(`[MongoDB Error] Database connection failed: ${fallbackErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
