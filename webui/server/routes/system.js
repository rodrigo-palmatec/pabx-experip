const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');
const os = require('os');

const router = express.Router();

// GET /api/system/status - Status do sistema
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const ami = req.app.get('ami');
    
    let asteriskStatus = {
      connected: false,
      version: 'Desconhecido',
      uptime: 0,
      reloadTime: 0
    };
    
    if (ami && ami.isConnected()) {
      try {
        const coreStatus = await ami.coreStatus();
        const coreSettings = await ami.coreSettings();
        
        asteriskStatus = {
          connected: true,
          version: coreSettings.asteriskversion || 'PABX Experip',
          uptime: parseInt(coreStatus.coreuptime) || 0,
          reloadTime: parseInt(coreStatus.corereloadtime) || 0,
          startupTime: coreStatus.corestartuptime,
          channels: parseInt(coreStatus.coreactivechannels) || 0,
          calls: parseInt(coreStatus.coreactivecalls) || 0
        };
      } catch (err) {
        logger.warn('Erro ao obter status do Asterisk:', err.message);
      }
    }
    
    // Status do sistema
    const systemStatus = {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      uptime: os.uptime(),
      loadAverage: os.loadavg()
    };
    
    res.json({
      asterisk: asteriskStatus,
      system: systemStatus
    });
  } catch (err) {
    logger.error('Erro ao obter status:', err);
    res.status(500).json({ error: 'Erro ao obter status do sistema' });
  }
});

// POST /api/system/reload - Recarregar configurações
router.post('/reload', authenticateToken, async (req, res) => {
  try {
    const { module } = req.body;
    const ami = req.app.get('ami');
    
    if (!ami || !ami.isConnected()) {
      return res.status(503).json({ error: 'AMI não conectado' });
    }
    
    await ami.reload(module || '');
    
    logger.info(`Reload executado por ${req.user.username}${module ? ` (módulo: ${module})` : ''}`);
    res.json({ message: 'Configurações recarregadas com sucesso' });
  } catch (err) {
    logger.error('Erro ao recarregar:', err);
    res.status(500).json({ error: 'Erro ao recarregar configurações' });
  }
});

// POST /api/system/command - Executar comando CLI
router.post('/command', authenticateToken, async (req, res) => {
  try {
    const { command } = req.body;
    const ami = req.app.get('ami');
    
    if (!command) {
      return res.status(400).json({ error: 'Comando é obrigatório' });
    }
    
    if (!ami || !ami.isConnected()) {
      return res.status(503).json({ error: 'AMI não conectado' });
    }
    
    // Comandos perigosos bloqueados
    const dangerous = ['stop', 'restart', 'shutdown'];
    if (dangerous.some(d => command.toLowerCase().includes(d))) {
      return res.status(403).json({ error: 'Comando não permitido via interface web' });
    }
    
    const result = await ami.command(command);
    
    logger.info(`Comando CLI executado por ${req.user.username}: ${command}`);
    res.json({ output: result.output || result });
  } catch (err) {
    logger.error('Erro ao executar comando:', err);
    res.status(500).json({ error: 'Erro ao executar comando' });
  }
});

// GET /api/system/logs - Últimos logs
router.get('/logs', authenticateToken, async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const lines = parseInt(req.query.lines) || 100;
    
    const logFile = '/var/log/asterisk/messages';
    
    if (!fs.existsSync(logFile)) {
      return res.json({ logs: [] });
    }
    
    const content = fs.readFileSync(logFile, 'utf8');
    const allLines = content.split('\n').filter(l => l.trim());
    const lastLines = allLines.slice(-lines);
    
    res.json({ logs: lastLines });
  } catch (err) {
    logger.error('Erro ao ler logs:', err);
    res.status(500).json({ error: 'Erro ao ler logs' });
  }
});

module.exports = router;
