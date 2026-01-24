const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const PeerGroup = sequelize.define('PeerGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  peerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'peer_groups',
  indexes: [
    {
      unique: true,
      fields: ['peerId', 'groupId']
    }
  ]
});

module.exports = PeerGroup;
