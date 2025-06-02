// Importing Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Defining Seat model
module.exports = sequelize.define('Seat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  busId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'blocked', 'booked'),
    defaultValue: 'available',
  },
  blockedUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  bookingId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  tableName: 'Seats',
  timestamps: true,
});