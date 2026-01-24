const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Callback = sequelize.define('Callback', {
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
  destinationType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'group'),
    allowNull: false
  },
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  destinationData: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  callerIdMode: {
    type: DataTypes.ENUM('caller', 'fixed'),
    defaultValue: 'caller'
  },
  callerIdNumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  delay: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    comment: 'Seconds to wait before calling back'
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
  tableName: 'callbacks'
});

module.exports = Callback;
