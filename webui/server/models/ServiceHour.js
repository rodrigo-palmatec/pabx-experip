const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ServiceHour = sequelize.define('ServiceHour', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  monday: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of time ranges [{start: "08:00", end: "18:00"}]'
  },
  tuesday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  wednesday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  thursday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  friday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  saturday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sunday: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  outOfHoursDestType: {
    type: DataTypes.ENUM('hangup', 'queue', 'ivr', 'peer', 'voicemail', 'external', 'audio'),
    defaultValue: 'hangup',
    comment: 'Destino fora do horário de atendimento'
  },
  outOfHoursDestId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  outOfHoursDestData: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Dados adicionais (número externo, arquivo de áudio)'
  },
  outOfHoursAudio: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Áudio a ser tocado fora do horário'
  },
  holidayGroupId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Grupo de feriados vinculado'
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
  tableName: 'service_hours'
});

module.exports = ServiceHour;
