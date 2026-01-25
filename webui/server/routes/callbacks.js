const express = require('express');
const router = express.Router();
const { Callback } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/callbacks - List all callbacks
router.get('/', async (req, res) => {
  try {
    const callbacks = await Callback.findAll({
      order: [['name', 'ASC']]
    });
    res.json(callbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/callbacks/:id - Get callback by ID
router.get('/:id', async (req, res) => {
  try {
    const callback = await Callback.findByPk(req.params.id);
    if (!callback) {
      return res.status(404).json({ error: 'Callback not found' });
    }
    res.json(callback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/callbacks - Create callback
router.post('/', async (req, res) => {
  try {
    const { name, extension, destinationType } = req.body;
    if (!name || !extension || !destinationType) {
      return res.status(400).json({ error: 'Name, extension and destinationType are required' });
    }

    const callback = await Callback.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(callback);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Callback extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/callbacks/:id - Update callback
router.put('/:id', async (req, res) => {
  try {
    const callback = await Callback.findByPk(req.params.id);
    if (!callback) {
      return res.status(404).json({ error: 'Callback not found' });
    }

    await callback.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(callback);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Callback extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/callbacks/:id - Delete callback
router.delete('/:id', async (req, res) => {
  try {
    const callback = await Callback.findByPk(req.params.id);
    if (!callback) {
      return res.status(404).json({ error: 'Callback not found' });
    }
    await callback.destroy();
    res.json({ success: 'Callback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
