const express = require('express');
const router = express.Router();
const { InboundRoute, ServiceHour } = require('../models');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

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
    const route = await InboundRoute.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });
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
    await route.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });
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
    res.json({ success: 'Inbound route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
