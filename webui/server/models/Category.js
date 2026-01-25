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
    type: DataTypes.ENUM('all', 'none', 'external'),
    defaultValue: 'none',
    comment: 'Gravar ligações: todas, nenhuma ou apenas externas'
  },
  callLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: 'Ligações simultâneas'
  },
  allowStatusChange: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Permite alterar status (online, ausente, ocupado)'
  },
  forceCallerid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Forçar BINA nas chamadas saintes'
  },
  timeout: {
    type: DataTypes.INTEGER,
    defaultValue: 60,
    comment: 'Tempo de toque em segundos'
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
