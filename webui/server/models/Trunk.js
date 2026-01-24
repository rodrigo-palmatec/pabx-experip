const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Trunk = sequelize.define('Trunk', {
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
  type: {
    type: DataTypes.ENUM('SIP', 'PJSIP', 'IAX2'),
    defaultValue: 'PJSIP'
  },
  host: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  port: {
    type: DataTypes.INTEGER,
    defaultValue: 5060
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  secret: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  context: {
    type: DataTypes.STRING(50),
    defaultValue: 'from-trunk'
  },
  codecs: {
    type: DataTypes.STRING(255),
    defaultValue: 'ulaw,alaw,g722'
  },
  dtmfMode: {
    type: DataTypes.STRING(20),
    defaultValue: 'rfc4733'
  },
  qualify: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  insecure: {
    type: DataTypes.STRING(50),
    defaultValue: 'port,invite'
  },
  fromUser: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  fromDomain: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  register: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  registerString: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'unknown'
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
  tableName: 'trunks'
});

module.exports = Trunk;
