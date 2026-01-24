const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CustomRule = sequelize.define('CustomRule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  conditions: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON object with conditions'
  },
  actions: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON object with actions'
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'custom_rules'
});

module.exports = CustomRule;
