// Importing required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./utils/logger');

// Loading environment variables
dotenv.config();

// Initializing Express app
const app = express();

// Applying middleware
app.use(cors());
app.use(express.json());

// Mounting API routes
app.use('/api', routes);

// Applying error handling middleware
app.use(errorMiddleware);

// Setting up server port
const PORT = process.env.PORT || 5000;

// Connecting to database and starting server
sequelize.authenticate()
  .then(() => {
    logger.info('Database connected successfully');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to database', { error: err.message });
  });