// Importing required modules
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Middleware to authenticate JWT
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    logger.warn('No token provided', { path: req.path });
    return next(new ApiError(401, 'No token provided'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info('User authenticated', { userId: decoded.id, role: decoded.role });
    next();
  } catch (error) {
    logger.error('Invalid token', { error: error.message });
    next(new ApiError(401, 'Invalid token'));
  }
};

// Middleware to authorize based on roles
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    logger.warn('Access denied', { userId: req.user.id, role: req.user.role, path: req.path });
    return next(new ApiError(403, 'Access denied'));
  }
  next();
};

module.exports = { authenticate, authorize };