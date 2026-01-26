const express = require('express');
const configManager = require('../services/config');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/extension-status - Status público dos ramais (sem autenticação)
router.get('/', async (req, res) => {
  try {
    const ami = req.app.get('ami');
    const extensions = configManager.getExtensions();
    
    // Buscar status dos endpoints
    let endpointStatus = [];
    if (ami && ami.isConnected()) {
      try {
        endpointStatus = await ami.pjsipEndpoints();
      } catch (err) {
        logger.warn('Não foi possível obter status dos endpoints');
      }
    }
    
    // Mesclar informações
    const result = extensions.map(ext => {
      const status = endpointStatus.find(s => s.objectname === ext.extension);
      return {
        extension: ext.extension,
        name: ext.name,
        callerid: ext.callerid,
        context: ext.context,
        auth: ext.auth,
        aors: ext.aors,
        status: status ? status.devicestate : 'Unknown',
        online: status ? status.devicestate !== 'Unavailable' : false
      };
    });
    
    res.json(result);
  } catch (error) {
    logger.error('Erro ao buscar status das extensões:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
