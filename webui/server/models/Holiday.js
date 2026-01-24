const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Holiday = sequelize.define('Holiday', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'If true, repeats every year'
  },
  serviceHourId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Associate with a service hour'
  },
  destinationType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'voicemail', 'external', 'hangup', 'default'),
    defaultValue: 'default'
  },
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  destinationData: {
    type: DataTypes.STRING(255),
    allowNull: true
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
  tableName: 'holidays'
});

module.exports = Holiday;
