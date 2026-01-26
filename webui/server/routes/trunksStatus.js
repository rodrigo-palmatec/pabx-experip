const express = require('express');
const configManager = require('../services/config');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/trunks-status - Listar troncos (público)
router.get('/', async (req, res) => {
  try {
    const ami = req.app.get('ami');
    
    // Buscar endpoints PJSIP que são troncos
    let endpoints = [];
    if (ami && ami.isConnected()) {
      try {
        endpoints = await ami.pjsipEndpoints();
      } catch (err) {
        logger.warn('Não foi possível obter endpoints PJSIP');
      }
    }
    
    // Filtrar apenas troncos (geralmente começam com "trunk-")
    const trunks = endpoints.filter(endpoint => 
      endpoint.object_name && endpoint.object_name.startsWith('trunk-')
    );
    
    // Mapear para formato esperado pelo frontend
    const result = trunks.map(trunk => ({
      name: trunk.object_name,
      endpoint: trunk.object_name,
      status: trunk.status,
      registered: trunk.status === 'Registered' || trunk.status === 'Available',
      host: trunk.aors || 'Unknown'
    }));
    
    res.json(result);
  } catch (err) {
    logger.error('Erro ao listar troncos:', err);
    res.status(500).json({ error: 'Erro ao listar troncos' });
  }
});

module.exports = router;
