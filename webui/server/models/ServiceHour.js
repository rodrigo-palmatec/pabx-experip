const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ServiceHour = sequelize.define('ServiceHour', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  monday: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of time ranges'
  },
  tuesday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  wednesday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  thursday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  friday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  saturday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sunday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'service_hours'
});

module.exports = ServiceHour;
