const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const MusicOnHold = sequelize.define('MusicOnHold', {
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
  directory: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  mode: {
    type: DataTypes.ENUM('files', 'custom', 'quietmp3', 'mp3', 'quietmp3nb', 'mp3nb'),
    defaultValue: 'files'
  },
  sort: {
    type: DataTypes.ENUM('alpha', 'random', 'randstart'),
    defaultValue: 'random'
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
  tableName: 'music_on_hold'
});

module.exports = MusicOnHold;
