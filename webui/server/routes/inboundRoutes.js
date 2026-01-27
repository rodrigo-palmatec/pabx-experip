const express = require('express');
const router = express.Router();
const { InboundRoute, ServiceHour } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

router.use(authenticateToken);

// GET /api/inboundRoutes - List all inbound routes
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
    res.status(500).json({ error: error.message });
  }
});

// GET /api/inboundRoutes/:id - Get inbound route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await InboundRoute.findByPk(req.params.id, {
      include: [{
        model: ServiceHour,
        as: 'ServiceHour'
      }]
    });
    if (!route) {
      return res.status(404).json({ error: 'Inbound route not found' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/inboundRoutes - Create inbound route
router.post('/', async (req, res) => {
  try {
    const data = { ...req.body };
    // Convert empty strings to null for foreign keys
    if (data.serviceHourId === '' || data.serviceHourId === undefined) {
      data.serviceHourId = null;
    }
    data.createdBy = req.user?.username || 'admin';

    const route = await InboundRoute.create(data);

    // Gerar dialplan após criar rota
    const DialplanGenerator = require('../services/dialplanGenerator');
    try {
      const generator = new DialplanGenerator();
      await generator.generateDialplan();
    } catch (dialplanError) {
      logger.warn('Erro ao gerar dialplan:', dialplanError.message);
    }

    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/inboundRoutes/:id - Update inbound route
router.put('/:id', async (req, res) => {
  try {
    const route = await InboundRoute.findByPk(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Inbound route not found' });
    }
    const data = { ...req.body };
    // Convert empty strings to null for foreign keys
    if (data.serviceHourId === '' || data.serviceHourId === undefined) {
      data.serviceHourId = null;
    }
    data.updatedBy = req.user?.username || 'admin';

    await route.update(data);

    // Gerar dialplan após atualizar rota
    const DialplanGenerator = require('../services/dialplanGenerator');
    try {
      const generator = new DialplanGenerator();
      await generator.generateDialplan();
    } catch (dialplanError) {
      logger.warn('Erro ao gerar dialplan:', dialplanError.message);
    }

    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/inboundRoutes/:id - Delete inbound route
router.delete('/:id', async (req, res) => {
  try {
    const route = await InboundRoute.findByPk(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Inbound route not found' });
    }
    await route.destroy();

    // Gerar dialplan após excluir rota
    const DialplanGenerator = require('../services/dialplanGenerator');
    try {
      const generator = new DialplanGenerator();
      await generator.generateDialplan();
    } catch (dialplanError) {
      logger.warn('Erro ao gerar dialplan:', dialplanError.message);
    }

    res.json({ success: 'Inbound route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
