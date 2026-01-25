const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Queue = sequelize.define('Queue', {
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
  extension: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  callCenter: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Fila de Call Center'
  },
  strategy: {
    type: DataTypes.ENUM('ringall', 'leastrecent', 'fewestcalls', 'random', 'rrmemory', 'linear', 'wrandom'),
    defaultValue: 'ringall'
  },
  timeout: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
    comment: 'Tempo de toque no ramal (segundos)'
  },
  maxWaitTime: {
    type: DataTypes.INTEGER,
    defaultValue: 300,
    comment: 'Tempo máximo de espera na fila (segundos)'
  },
  wrapupTime: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Tempo de pós-atendimento (segundos)'
  },
  announceFrequency: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  announcePosition: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  announceHoldTime: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  mohClass: {
    type: DataTypes.STRING(50),
    defaultValue: 'default'
  },
  joinEmpty: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  leaveWhenEmpty: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ringinuse: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  servicelevel: {
    type: DataTypes.INTEGER,
    defaultValue: 60,
    comment: 'SLA em segundos'
  },
  weight: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  monitor: {
    type: DataTypes.ENUM('none', 'all', 'external'),
    defaultValue: 'none',
    comment: 'Gravação: nenhuma, todas, apenas externas'
  },
  serviceHourId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Horário de atendimento vinculado'
  },
  overflowDestType: {
    type: DataTypes.ENUM('hangup', 'queue', 'ivr', 'peer', 'external'),
    defaultValue: 'hangup',
    comment: 'Tipo de destino do transbordo'
  },
  overflowDestId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'ID do destino do transbordo'
  },
  overflowDestData: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Dados adicionais do transbordo (ex: número externo)'
  },
  entryAudio: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Áudio de entrada da fila'
  },
  periodicAudio: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Áudio periódico'
  },
  exitAudio: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Áudio de saída/transbordo'
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
  tableName: 'queues'
});

module.exports = Queue;
