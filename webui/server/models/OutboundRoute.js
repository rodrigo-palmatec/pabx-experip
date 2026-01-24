const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const OutboundRoute = sequelize.define('OutboundRoute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  pattern: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Dial pattern regex'
  },
  prepend: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Digits to prepend'
  },
  prefix: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Prefix to strip'
  },
  trunkId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trunkSequence: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of trunk IDs for failover'
  },
  callerIdMode: {
    type: DataTypes.ENUM('default', 'fixed', 'outbound', 'peer'),
    defaultValue: 'default'
  },
  callerIdNumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  callerIdName: {
    type: DataTypes.STRING(100),
    allowNull: true
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
  tableName: 'outbound_routes'
});

module.exports = OutboundRoute;
