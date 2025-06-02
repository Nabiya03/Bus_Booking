// Importing Winston for logging
const winston = require('winston');
// Loading environment variables
const dotenv = require('dotenv');

dotenv.config();

// Creating Winston logger for terminal output only
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // Setting log level from .env
  format: winston.format.combine(
    winston.format.colorize(), // Colorized output for terminal
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logging to terminal only
  ],
});

module.exports = logger;