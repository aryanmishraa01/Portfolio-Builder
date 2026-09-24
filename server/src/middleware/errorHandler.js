// server/src/middleware/errorHandler.js
// Basic central error handling middleware

const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err.message || err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
