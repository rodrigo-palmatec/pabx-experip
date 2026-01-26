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
        console.log('Endpoints encontrados:', endpoints.length);
      } catch (err) {
        logger.warn('Não foi possível obter endpoints PJSIP');
      }
    }
    
    // Se não encontrar endpoints via AMI, buscar do config
    if (endpoints.length === 0) {
      const configManager = require('../services/config');
      const content = configManager.readConfig('pjsip.conf');
      const lines = content.split('\n');
      const trunkSections = [];
      
      let currentSection = null;
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          currentSection = trimmed.slice(1, -1);
          if (currentSection.startsWith('trunk-') && !currentSection.includes('-auth') && !currentSection.includes('-aor')) {
            trunkSections.push(currentSection);
          }
        }
      }
      
      const result = trunkSections.map(trunkName => ({
        name: trunkName,
        endpoint: trunkName,
        status: 'Unknown',
        registered: true,
        host: 'Configured'
      }));
      
      console.log('Troncos do config:', result);
      res.json(result);
      return;
    }
    
    // Filtrar apenas troncos (geralmente começam com "trunk-")
    const trunks = endpoints.filter(endpoint => 
      endpoint.object_name && endpoint.object_name.startsWith('trunk-')
    );
    
    console.log('Troncos filtrados:', trunks.length);
    
    // Mapear para formato esperado pelo frontend
    const result = trunks.map(trunk => ({
      name: trunk.object_name,
      endpoint: trunk.object_name,
      status: trunk.status,
      registered: trunk.status === 'Registered' || trunk.status === 'Available',
      host: trunk.aors || 'Unknown'
    }));
    
    console.log('Resultado final:', result);
    res.json(result);
  } catch (err) {
    logger.error('Erro ao listar troncos:', err);
    console.error('Erro detalhado:', err);
    res.status(500).json({ error: 'Erro ao listar troncos' });
  }
});

module.exports = router;
