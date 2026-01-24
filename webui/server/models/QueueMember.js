const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const QueueMember = sequelize.define('QueueMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  queueId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  penalty: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  paused: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pauseReason: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'queue_members',
  indexes: [
    {
      unique: true,
      fields: ['queueId', 'peerId']
    }
  ]
});

module.exports = QueueMember;
