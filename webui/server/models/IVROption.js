const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const IVROption = sequelize.define('IVROption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ivrId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  digit: {
    type: DataTypes.STRING(5),
    allowNull: false,
    comment: '0-9, *, #, i (invalid), t (timeout)'
  },
  destinationType: {
    type: DataTypes.ENUM('peer', 'queue', 'ivr', 'group', 'conference', 'voicemail', 'external', 'hangup', 'repeat'),
    allowNull: false
  },
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  destinationData: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'ivr_options',
  indexes: [
    {
      unique: true,
      fields: ['ivrId', 'digit']
    }
  ]
});

module.exports = IVROption;
