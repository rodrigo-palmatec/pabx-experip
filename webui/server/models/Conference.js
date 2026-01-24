const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Conference = sequelize.define('Conference', {
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
  pin: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  adminPin: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  maxMembers: {
    type: DataTypes.INTEGER,
    defaultValue: 50
  },
  record: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mohClass: {
    type: DataTypes.STRING(50),
    defaultValue: 'default'
  },
  announceJoinLeave: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  waitForMarked: {
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
  tableName: 'conferences'
});

module.exports = Conference;
