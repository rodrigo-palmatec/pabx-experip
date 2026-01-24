const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Peer = sequelize.define('Peer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  secret: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  callCenter: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  hideOnAgenda: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sipRegStatus: {
    type: DataTypes.STRING(20),
    defaultValue: 'UNAVAILABLE'
  },
  sipIp: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  iaxRegStatus: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  iaxIp: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  newVoicemail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dynamic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  webrtc: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  provisioning: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deviceBrand: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  deviceModel: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  deviceMac: {
    type: DataTypes.STRING(17),
    allowNull: true
  },
  context: {
    type: DataTypes.STRING(50),
    defaultValue: 'internal'
  },
  callerid: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  profileId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  costCenterId: {
    type: DataTypes.INTEGER,
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
  tableName: 'peers'
});

module.exports = Peer;
