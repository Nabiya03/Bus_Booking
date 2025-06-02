// Importing Sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

// Loading environment variables
dotenv.config();

// Initializing Sequelize with PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: (msg) => logger.debug(msg), // Redirecting Sequelize logs to Winston
});

module.exports = { sequelize };