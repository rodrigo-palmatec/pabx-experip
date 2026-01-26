require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const logger = require('./utils/logger');

// Database
const { syncDatabase } = require('./models');

// Routes
const authRoutes = require('./routes/auth');
const extensionsRoutes = require('./routes/extensions');
const trunksRoutes = require('./routes/trunks');
const systemRoutes = require('./routes/system');
const callsRoutes = require('./routes/calls');
const categoriesRoutes = require('./routes/categories');
const groupsRoutes = require('./routes/groups');
const profilesRoutes = require('./routes/profiles');
const costCentersRoutes = require('./routes/costCenters');
const queuesRoutes = require('./routes/queues');
const peersRoutes = require('./routes/peers');
const inboundRoutesRoutes = require('./routes/inboundRoutes');
const outboundRoutesRoutes = require('./routes/outboundRoutes');
const serviceHoursRoutes = require('./routes/serviceHours');
const holidaysRoutes = require('./routes/holidays');
const blacklistRoutes = require('./routes/blacklist');
const conferencesRoutes = require('./routes/conferences');
const mohRoutes = require('./routes/moh');
const ivrsRoutes = require('./routes/ivrs');
const reportsRoutes = require('./routes/reports');
const clickToCallRoutes = require('./routes/clickToCall');
const contactsRoutes = require('./routes/contacts');
const callbacksRoutes = require('./routes/callbacks');
const customRulesRoutes = require('./routes/customRules');
const recordingsRoutes = require('./routes/recordings');
const statusRoutes = require('./routes/status');
const systemUpdateRoutes = require('./routes/systemUpdate');
const extensionStatusRoutes = require('./routes/extensionStatus');
const trunksStatusRoutes = require('./routes/trunksStatus');
const serviceHoursPublicRoutes = require('./routes/serviceHoursPublic');
const queuesPublicRoutes = require('./routes/queuesPublic');
const ivrsPublicRoutes = require('./routes/ivrsPublic');
const inboundRoutesPublicRoutes = require('./routes/inboundRoutesPublic');

const AmiManager = require('./services/ami');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : '*',
    methods: ['GET', 'POST']
  }
});

// Trust proxy - necessário quando atrás de Nginx
app.set('trust proxy', 1);

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Inicializar AMI
const ami = new AmiManager();
ami.connect().catch(err => {
  logger.error('Falha ao conectar ao AMI:', err.message);
});

// Disponibilizar AMI para as rotas
app.set('ami', ami);
app.set('io', io);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/extensions', extensionsRoutes);
app.use('/api/trunks', trunksRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/calls', callsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/costCenters', costCentersRoutes);
app.use('/api/queues', queuesRoutes);
app.use('/api/peers', peersRoutes);
app.use('/api/inboundRoutes', inboundRoutesRoutes);
app.use('/api/outboundRoutes', outboundRoutesRoutes);
app.use('/api/serviceHours', serviceHoursRoutes);
app.use('/api/holidays', holidaysRoutes);
app.use('/api/blacklist', blacklistRoutes);
app.use('/api/conferences', conferencesRoutes);
app.use('/api/moh', mohRoutes);
app.use('/api/ivrs', ivrsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/clickToCall', clickToCallRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/callbacks', callbacksRoutes);
app.use('/api/customRules', customRulesRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/system/update', systemUpdateRoutes);
app.use('/api/extension-status', extensionStatusRoutes);
app.use('/api/trunks-status', trunksStatusRoutes);
app.use('/api/service-hours-public', serviceHoursPublicRoutes);
app.use('/api/queues-public', queuesPublicRoutes);
app.use('/api/ivrs-public', ivrsPublicRoutes);
app.use('/api/inbound-routes-public', inboundRoutesPublicRoutes);

// Servir frontend em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Socket.IO - Eventos em tempo real
io.on('connection', (socket) => {
  logger.info(`Cliente conectado: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`Cliente desconectado: ${socket.id}`);
  });
});

// Eventos do AMI para Socket.IO
ami.on('event', (event) => {
  if (event.event === 'Newchannel' || 
      event.event === 'Hangup' || 
      event.event === 'Bridge' ||
      event.event === 'DialBegin' ||
      event.event === 'DialEnd') {
    io.emit('call-event', event);
  }
  
  if (event.event === 'PeerStatus' || event.event === 'DeviceStateChange') {
    // Atualizar status do peer no banco
    updatePeerStatus(event);
    io.emit('peer-status', event);
  }
});

// Função para atualizar status do peer no banco
async function updatePeerStatus(event) {
  try {
    const { Peer } = require('./models');
    
    let peerName = null;
    let status = 'UNAVAILABLE';
    
    // Extrair nome do peer e status do evento
    if (event.peer) {
      peerName = event.peer.replace('SIP/', '').replace('PJSIP/', '');
    } else if (event.channel) {
      // Para eventos DeviceStateChange
      const match = event.channel.match(/^(SIP|PJSIP)\/(.+?)-/);
      if (match) {
        peerName = match[2];
      }
    }
    
    if (event.status) {
      const s = event.status.toUpperCase();
      if (s.includes('OK') || s.includes('REACHABLE') || s === 'AVAILABLE') {
        status = 'AVAILABLE';
      } else if (s.includes('BUSY') || s.includes('INUSE')) {
        status = 'BUSY';
      } else if (s.includes('RINGING')) {
        status = 'RINGING';
      } else if (s.includes('PAUSED')) {
        status = 'PAUSED';
      }
    }
    
    if (event.state) {
      const s = event.state.toUpperCase();
      if (s === 'ONLINE' || s === 'AVAILABLE') {
        status = 'AVAILABLE';
      } else if (s === 'BUSY' || s === 'INUSE') {
        status = 'BUSY';
      } else if (s === 'RINGING') {
        status = 'RINGING';
      }
    }
    
    // Não atualiza mais o banco - usa API em tempo real
  } catch (error) {
    console.error('Erro ao processar evento AMI:', error);
  }
}

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

// Inicializar banco de dados e servidor
const startServer = async () => {
  try {
    // Sincronizar banco de dados
    await syncDatabase();
    logger.info('Banco de dados sincronizado');

    // Iniciar servidor HTTP
    server.listen(PORT, HOST, () => {
      logger.info(`Servidor PABX Experip WebUI rodando em http://${HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido. Encerrando...');
  ami.disconnect();
  server.close(() => {
    logger.info('Servidor encerrado');
    process.exit(0);
  });
});
