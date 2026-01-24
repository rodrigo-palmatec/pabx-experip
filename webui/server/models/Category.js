const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define('Category', {
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
  nat: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  voicemail: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  followme: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  passwordCall: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  monitor: {
    type: DataTypes.ENUM('all', 'none', 'in', 'out'),
    defaultValue: 'none'
  },
  callLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  timeout: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  timeRestrictionStart: {
    type: DataTypes.STRING(8),
    allowNull: true
  },
  timeRestrictionEnd: {
    type: DataTypes.STRING(8),
    allowNull: true
  },
  overflowExtension: {
    type: DataTypes.STRING(20),
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
  tableName: 'categories'
});

module.exports = Category;
