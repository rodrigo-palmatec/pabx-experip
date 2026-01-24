const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CDR = sequelize.define('CDR', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  calldate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  clid: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  src: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dst: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dcontext: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  channel: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  dstchannel: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  lastapp: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  lastdata: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  billsec: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  disposition: {
    type: DataTypes.ENUM('ANSWERED', 'NO ANSWER', 'BUSY', 'FAILED', 'CONGESTION'),
    allowNull: true
  },
  amaflags: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  accountcode: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  uniqueid: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  linkedid: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  userfield: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  peeraccount: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  sequence: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  callType: {
    type: DataTypes.ENUM('inbound', 'outbound', 'internal'),
    allowNull: true
  },
  trunkId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  queueId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  costCenterId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  recordingPath: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'cdr',
  timestamps: false,
  indexes: [
    { fields: ['calldate'] },
    { fields: ['src'] },
    { fields: ['dst'] },
    { fields: ['uniqueid'] },
    { fields: ['disposition'] }
  ]
});

module.exports = CDR;
