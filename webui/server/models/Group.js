const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Group = sequelize.define('Group', {
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
  ringStrategy: {
    type: DataTypes.ENUM('ringall', 'hunt', 'memoryhunt', 'firstavailable', 'random'),
    defaultValue: 'ringall'
  },
  ringTime: {
    type: DataTypes.INTEGER,
    defaultValue: 20
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
  tableName: 'groups'
});

module.exports = Group;
