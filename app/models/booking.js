// Importing Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Defining Booking model
module.exports = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  busId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'Bookings',
  timestamps: true,
});