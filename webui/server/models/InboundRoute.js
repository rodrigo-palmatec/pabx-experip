const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const InboundRoute = sequelize.define('InboundRoute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  did: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'DID/DDR number pattern'
  },
  cidPattern: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Caller ID pattern'
  },
  destinationType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'group', 'conference', 'voicemail', 'external', 'hangup'),
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
  serviceHourId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  outOfServiceDestType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'group', 'voicemail', 'external', 'hangup'),
    allowNull: true
  },
  outOfServiceDestId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  outOfServiceDestData: {
    type: DataTypes.STRING(255),
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
  tableName: 'inbound_routes'
});

module.exports = InboundRoute;
