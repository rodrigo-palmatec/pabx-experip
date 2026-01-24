const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Queue = sequelize.define('Queue', {
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
  extension: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  strategy: {
    type: DataTypes.ENUM('ringall', 'leastrecent', 'fewestcalls', 'random', 'rrmemory', 'linear', 'wrandom'),
    defaultValue: 'ringall'
  },
  timeout: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  maxWaitTime: {
    type: DataTypes.INTEGER,
    defaultValue: 300
  },
  wrapupTime: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  announceFrequency: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  announcePosition: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  announceHoldTime: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  mohClass: {
    type: DataTypes.STRING(50),
    defaultValue: 'default'
  },
  joinEmpty: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  leaveWhenEmpty: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ringinuse: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  servicelevel: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  weight: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'queues'
});

module.exports = Queue;
