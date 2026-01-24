const AsteriskManager = require('asterisk-manager');
const EventEmitter = require('events');
const logger = require('../utils/logger');

class AmiManager extends EventEmitter {
  constructor() {
    super();
    this.ami = null;
    this.connected = false;
    this.reconnectTimeout = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const host = process.env.AMI_HOST || '127.0.0.1';
      const port = parseInt(process.env.AMI_PORT) || 5038;
      const username = process.env.AMI_USER || 'admin';
      const secret = process.env.AMI_SECRET || '';

      logger.info(`Conectando ao AMI em ${host}:${port}...`);

      this.ami = new AsteriskManager(port, host, username, secret, true);

      this.ami.keepConnected();

      this.ami.on('connect', () => {
        logger.info('Conectado ao Asterisk AMI');
        this.connected = true;
        resolve();
      });

      this.ami.on('error', (err) => {
        logger.error('Erro AMI:', err.message);
        this.connected = false;
        if (!this.reconnectTimeout) {
          reject(err);
        }
      });

      this.ami.on('close', () => {
        logger.warn('Conexão AMI fechada');
        this.connected = false;
        this.scheduleReconnect();
      });

      this.ami.on('managerevent', (event) => {
        this.emit('event', event);
      });

      setTimeout(() => {
        if (!this.connected) {
          reject(new Error('Timeout ao conectar ao AMI'));
        }
      }, 10000);
    });
  }

  scheduleReconnect() {
    if (this.reconnectTimeout) return;
    
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      logger.info('Tentando reconectar ao AMI...');
      this.connect().catch(err => {
        logger.error('Falha na reconexão:', err.message);
      });
    }, 5000);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ami) {
      this.ami.disconnect();
    }
  }

  isConnected() {
    return this.connected;
  }

  action(action, callback) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        return reject(new Error('Não conectado ao AMI'));
      }

      this.ami.action(action, (err, res) => {
        if (callback) callback(err, res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  // Comandos específicos

  async coreStatus() {
    return this.action({ action: 'CoreStatus' });
  }

  async coreSettings() {
    return this.action({ action: 'CoreSettings' });
  }

  async sipPeers() {
    return this.action({ action: 'SIPpeers' });
  }

  async pjsipEndpoints() {
    const results = [];
    return new Promise((resolve, reject) => {
      this.ami.action({ action: 'PJSIPShowEndpoints' }, (err, res) => {
        if (err) return reject(err);
      });

      const handler = (event) => {
        if (event.event === 'EndpointList') {
          results.push(event);
        } else if (event.event === 'EndpointListComplete') {
          this.ami.removeListener('managerevent', handler);
          resolve(results);
        }
      };

      this.ami.on('managerevent', handler);

      setTimeout(() => {
        this.ami.removeListener('managerevent', handler);
        resolve(results);
      }, 5000);
    });
  }

  async getActiveCalls() {
    const results = [];
    return new Promise((resolve, reject) => {
      this.ami.action({ action: 'CoreShowChannels' }, (err, res) => {
        if (err) return reject(err);
      });

      const handler = (event) => {
        if (event.event === 'CoreShowChannel') {
          results.push(event);
        } else if (event.event === 'CoreShowChannelsComplete') {
          this.ami.removeListener('managerevent', handler);
          resolve(results);
        }
      };

      this.ami.on('managerevent', handler);

      setTimeout(() => {
        this.ami.removeListener('managerevent', handler);
        resolve(results);
      }, 5000);
    });
  }

  async originate(channel, context, exten, priority, callerid) {
    return this.action({
      action: 'Originate',
      channel: channel,
      context: context,
      exten: exten,
      priority: priority || 1,
      callerid: callerid,
      async: 'true'
    });
  }

  async hangup(channel) {
    return this.action({
      action: 'Hangup',
      channel: channel
    });
  }

  async reload(module) {
    return this.action({
      action: 'Reload',
      module: module || ''
    });
  }

  async command(cmd) {
    return this.action({
      action: 'Command',
      command: cmd
    });
  }

  async getQueues() {
    return this.action({ action: 'QueueStatus' });
  }

  async getRegistry() {
    const results = [];
    return new Promise((resolve, reject) => {
      this.ami.action({ action: 'PJSIPShowRegistrationsOutbound' }, (err, res) => {
        if (err) return reject(err);
      });

      const handler = (event) => {
        if (event.event === 'OutboundRegistrationDetail') {
          results.push(event);
        } else if (event.event === 'OutboundRegistrationDetailComplete') {
          this.ami.removeListener('managerevent', handler);
          resolve(results);
        }
      };

      this.ami.on('managerevent', handler);

      setTimeout(() => {
        this.ami.removeListener('managerevent', handler);
        resolve(results);
      }, 5000);
    });
  }
}

module.exports = AmiManager;
