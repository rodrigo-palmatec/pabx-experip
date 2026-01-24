const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ClickToCall = sequelize.define('ClickToCall', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'clickToCall'
  },
  configuration: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON configuration for click-to-call'
  },
  authenticate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  tableName: 'click_to_call'
});

module.exports = ClickToCall;
