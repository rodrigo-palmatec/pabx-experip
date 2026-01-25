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
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Habilita/desabilita o tronco'
  },
  type: {
    type: DataTypes.ENUM('SIP', 'PJSIP', 'IAX2', 'KHOMP'),
    defaultValue: 'PJSIP'
  },
  authType: {
    type: DataTypes.ENUM('receive_register', 'send_register', 'by_ip'),
    defaultValue: 'send_register',
    comment: 'Tipo de autenticação: Recebe Registro, Envia Registro, Por IP'
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
    defaultValue: true,
    comment: 'Monitorar status do tronco (OPTIONS)'
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
  callerid: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'BINA - Número de identificação para chamadas saintes'
  },
  callLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Limite de chamadas simultâneas (0 = ilimitado)'
  },
  register: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  registerString: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  extraConfig: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Configurações extras para necessidades específicas'
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
