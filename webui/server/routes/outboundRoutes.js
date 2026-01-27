const express = require('express');
const router = express.Router();
const { OutboundRoute, Trunk, Profile } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/outboundRoutes - List all outbound routes
router.get('/', async (req, res) => {
  try {
    const routes = await OutboundRoute.findAll({
      include: [
        { model: Trunk, as: 'Trunk', attributes: ['id', 'name', 'host'] },
        { model: Profile, as: 'Profiles', attributes: ['id', 'name'], through: { attributes: [] } }
      ],
      order: [['priority', 'DESC'], ['name', 'ASC']]
    });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/outboundRoutes/:id - Get outbound route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await OutboundRoute.findByPk(req.params.id, {
      include: [
        { model: Trunk, as: 'Trunk' },
        { model: Profile, as: 'Profiles', through: { attributes: [] } }
      ]
    });
    if (!route) {
      return res.status(404).json({ error: 'Outbound route not found' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/outboundRoutes - Create outbound route
router.post('/', async (req, res) => {
  try {
    const { name, pattern, trunkId } = req.body;

    if (!name || !pattern || !trunkId) {
      return res.status(400).json({ error: 'Name, pattern and trunkId are required' });
    }

    const route = await OutboundRoute.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    await route.reload({
      include: [{ model: Trunk, as: 'Trunk', attributes: ['id', 'name'] }]
    });

    // Regenerar dialplan
    const dialplanGenerator = new (require('../services/dialplanGenerator'))();
    await dialplanGenerator.generateDialplan();

    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/outboundRoutes/:id - Update outbound route
router.put('/:id', async (req, res) => {
  try {
    const route = await OutboundRoute.findByPk(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Outbound route not found' });
    }
    await route.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    await route.reload({
      include: [{ model: Trunk, as: 'Trunk', attributes: ['id', 'name'] }]
    });

    // Regenerar dialplan
    const dialplanGenerator = new (require('../services/dialplanGenerator'))();
    await dialplanGenerator.generateDialplan();

    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/outboundRoutes/:id - Delete outbound route
router.delete('/:id', async (req, res) => {
  try {
    const route = await OutboundRoute.findByPk(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Outbound route not found' });
    }
    await route.destroy();

    // Regenerar dialplan
    const dialplanGenerator = new (require('../services/dialplanGenerator'))();
    await dialplanGenerator.generateDialplan();

    res.json({ success: 'Outbound route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
