const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const IVR = sequelize.define('IVR', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  extension: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  greetingFile: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  timeout: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  maxRetries: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  invalidFile: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  timeoutFile: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  timeoutDestType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'hangup', 'repeat'),
    defaultValue: 'hangup'
  },
  timeoutDestId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  invalidDestType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'hangup', 'repeat'),
    defaultValue: 'repeat'
  },
  invalidDestId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  directDial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tableName: 'ivrs'
});

module.exports = IVR;
