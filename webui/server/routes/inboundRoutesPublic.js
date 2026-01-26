const express = require('express');
const router = express.Router();
const { InboundRoute, ServiceHour } = require('../models');

// GET /api/inbound-routes-public - List all inbound routes (público)
router.get('/', async (req, res) => {
  try {
    const routes = await InboundRoute.findAll({
      include: [{
        model: ServiceHour,
        as: 'ServiceHour',
        attributes: ['id', 'name']
      }],
      order: [['priority', 'DESC'], ['name', 'ASC']]
    });
    res.json(routes);
  } catch (error) {
    console.error('Erro ao listar rotas de entrada:', error);
    res.status(500).json({ error: 'Erro ao listar rotas de entrada' });
  }
});

module.exports = router;
