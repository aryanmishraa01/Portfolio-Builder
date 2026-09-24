// server/src/middleware/auth.js
// Middleware to verify JWT token and protect API routes

const jwt = require('jsonwebtoken');

/**
 * Protect routes: Checks for JWT token in the Authorization header.
 * Header format expected: "Bearer <token>"
 */
const protect = (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token string after "Bearer "
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature using JWT_SECRET
      const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_portfolio_builder';
      const decoded = jwt.verify(token, secret);

      // Attach decoded user info (id, email, name) to request object
      req.user = decoded;

      // Proceed to the next middleware or controller function
      return next();
    } catch (error) {
      console.error('JWT Token Verification Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
    }
  }

  // If no token is found in the headers
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
