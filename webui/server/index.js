require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const logger = require('./utils/logger');
const authRoutes = require('./routes/auth');
const extensionsRoutes = require('./routes/extensions');
const trunksRoutes = require('./routes/trunks');
const systemRoutes = require('./routes/system');
const callsRoutes = require('./routes/calls');
const AmiManager = require('./services/ami');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
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
    io.emit('peer-status', event);
  }
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

server.listen(PORT, HOST, () => {
  logger.info(`Servidor PABX Experip WebUI rodando em http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido. Encerrando...');
  ami.disconnect();
  server.close(() => {
    logger.info('Servidor encerrado');
    process.exit(0);
  });
});
