const express = require('express');
const router = express.Router();
const { CostCenter, Peer } = require('../models');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// GET /api/costCenters - List all cost centers
router.get('/', async (req, res) => {
  try {
    const costCenters = await CostCenter.findAll({
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name']
      }],
      order: [['name', 'ASC']]
    });
    res.json(costCenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/costCenters/:id - Get cost center by ID
router.get('/:id', async (req, res) => {
  try {
    const costCenter = await CostCenter.findByPk(req.params.id, {
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name']
      }]
    });
    if (!costCenter) {
      return res.status(404).json({ error: 'Cost center not found' });
    }
    res.json(costCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/costCenters - Create cost center
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const costCenter = await CostCenter.create({
      name,
      description,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(costCenter);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Cost center name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/costCenters/:id - Update cost center
router.put('/:id', async (req, res) => {
  try {
    const costCenter = await CostCenter.findByPk(req.params.id);
    if (!costCenter) {
      return res.status(404).json({ error: 'Cost center not found' });
    }

    const updateData = { ...req.body };
    updateData.updatedBy = req.user?.username || 'admin';

    await costCenter.update(updateData);
    res.json(costCenter);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Cost center name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/costCenters/:id - Delete cost center
router.delete('/:id', async (req, res) => {
  try {
    const costCenter = await CostCenter.findByPk(req.params.id);
    if (!costCenter) {
      return res.status(404).json({ error: 'Cost center not found' });
    }

    // Check if cost center has peers
    const peersCount = await Peer.count({ where: { costCenterId: req.params.id } });
    if (peersCount > 0) {
      return res.status(422).json({ 
        error: `Cannot delete cost center with ${peersCount} associated peer(s)` 
      });
    }

    await costCenter.destroy();
    res.json({ success: 'Cost center deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
