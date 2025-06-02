// Importing all models and Sequelize
const { sequelize } = require('../config/database');
const User = require('./user');
const Bus = require('./bus');
const Seat = require('./seat');
const Booking = require('./booking');
const Operator = require('./operator');
const Payment = require('./payment');
const logger = require('../utils/logger');

// Setting up associations
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Operator.hasMany(Bus, { foreignKey: 'operatorId', onDelete: 'CASCADE' });
Bus.belongsTo(Operator, { foreignKey: 'operatorId' });

Bus.hasMany(Seat, { foreignKey: 'busId', onDelete: 'CASCADE' });
Seat.belongsTo(Bus, { foreignKey: 'busId' });

Booking.hasMany(Seat, { foreignKey: 'bookingId', onDelete: 'CASCADE' });
Seat.belongsTo(Booking, { foreignKey: 'bookingId' });

User.hasMany(Payment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'userId' });
Booking.hasOne(Payment, { foreignKey: 'bookingId', onDelete: 'CASCADE' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId' });

// Syncing models with database
sequelize.sync()
  .then(() => logger.info('All models synced successfully'))
  .catch((err) => logger.error('Model sync failed', { error: err.message }));

module.exports = { sequelize, User, Bus, Seat, Booking, Operator, Payment };