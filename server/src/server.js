// server/src/server.js
// Main entry point for Node.js Express server

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Body Parser Middleware (parse JSON request body)
app.use(express.json());

// Enable CORS so React client can communicate with Express backend
app.use(cors());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Portfolio Builder API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// API Routes Setup
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// Central Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Builder Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api\n`);
});
