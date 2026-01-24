const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ProfileRoute = sequelize.define('ProfileRoute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  profileId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  outboundRouteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'profile_routes',
  indexes: [
    {
      unique: true,
      fields: ['profileId', 'outboundRouteId']
    }
  ]
});

module.exports = ProfileRoute;
