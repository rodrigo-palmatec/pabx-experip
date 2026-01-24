const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/calls/active - Chamadas ativas
router.get('/active', authenticateToken, async (req, res) => {
  try {
    const ami = req.app.get('ami');
    
    if (!ami || !ami.isConnected()) {
      return res.status(503).json({ error: 'AMI não conectado' });
    }
    
    const channels = await ami.getActiveCalls();
    
    const calls = channels.map(ch => ({
      channel: ch.channel,
      callerid: ch.calleridnum,
      calleridName: ch.calleridname,
      context: ch.context,
      extension: ch.exten,
      state: ch.channelstatedesc,
      duration: ch.duration,
      application: ch.application,
      bridgedChannel: ch.bridgedchannel
    }));
    
    res.json(calls);
  } catch (err) {
    logger.error('Erro ao listar chamadas:', err);
    res.status(500).json({ error: 'Erro ao listar chamadas ativas' });
  }
});

// POST /api/calls/originate - Originar chamada
router.post('/originate', authenticateToken, async (req, res) => {
  try {
    const { from, to, context } = req.body;
    const ami = req.app.get('ami');
    
    if (!from || !to) {
      return res.status(400).json({ error: 'Origem e destino são obrigatórios' });
    }
    
    if (!ami || !ami.isConnected()) {
      return res.status(503).json({ error: 'AMI não conectado' });
    }
    
    const channel = `PJSIP/${from}`;
    const dialContext = context || 'internal';
    
    await ami.originate(channel, dialContext, to, 1, `"WebUI" <${from}>`);
    
    logger.info(`Chamada originada por ${req.user.username}: ${from} -> ${to}`);
    res.json({ message: 'Chamada iniciada', from, to });
  } catch (err) {
    logger.error('Erro ao originar chamada:', err);
    res.status(500).json({ error: 'Erro ao originar chamada' });
  }
});

// POST /api/calls/hangup - Desligar chamada
router.post('/hangup', authenticateToken, async (req, res) => {
  try {
    const { channel } = req.body;
    const ami = req.app.get('ami');
    
    if (!channel) {
      return res.status(400).json({ error: 'Canal é obrigatório' });
    }
    
    if (!ami || !ami.isConnected()) {
      return res.status(503).json({ error: 'AMI não conectado' });
    }
    
    await ami.hangup(channel);
    
    logger.info(`Chamada desligada por ${req.user.username}: ${channel}`);
    res.json({ message: 'Chamada desligada', channel });
  } catch (err) {
    logger.error('Erro ao desligar chamada:', err);
    res.status(500).json({ error: 'Erro ao desligar chamada' });
  }
});

// GET /api/calls/queues - Status das filas
router.get('/queues', authenticateToken, async (req, res) => {
  try {
    const ami = req.app.get('ami');
    
    if (!ami || !ami.isConnected()) {
      return res.status(503).json({ error: 'AMI não conectado' });
    }
    
    const result = await ami.getQueues();
    res.json(result);
  } catch (err) {
    logger.error('Erro ao listar filas:', err);
    res.status(500).json({ error: 'Erro ao listar filas' });
  }
});

module.exports = router;
