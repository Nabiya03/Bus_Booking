// Importing Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Defining Bus model
module.exports = sequelize.define('Bus', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  busNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  operatorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Buses',
  timestamps: true,
});