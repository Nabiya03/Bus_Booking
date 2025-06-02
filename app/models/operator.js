// Importing Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Defining Operator model
module.exports = sequelize.define('Operator', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
}, {
  tableName: 'Operators',
  timestamps: true,
});