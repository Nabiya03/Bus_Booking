// Importing required modules
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Middleware to handle errors
const errorMiddleware = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`, {
    errors: err.errors || [],
    stack: err.stack,
  });
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    errors: [err.message],
  });
};

module.exports = errorMiddleware;