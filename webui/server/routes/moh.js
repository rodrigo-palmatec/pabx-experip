const express = require('express');
const router = express.Router();
const { MusicOnHold } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/moh - List all music on hold classes
router.get('/', async (req, res) => {
  try {
    const mohClasses = await MusicOnHold.findAll({
      order: [['name', 'ASC']]
    });
    res.json(mohClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/moh/:id - Get MOH class by ID
router.get('/:id', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }
    res.json(moh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/moh - Create MOH class
router.post('/', async (req, res) => {
  try {
    const { name, directory } = req.body;
    if (!name || !directory) {
      return res.status(400).json({ error: 'Name and directory are required' });
    }

    const moh = await MusicOnHold.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(moh);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'MOH class name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/moh/:id - Update MOH class
router.put('/:id', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }

    await moh.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(moh);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'MOH class name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/moh/:id - Delete MOH class
router.delete('/:id', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }
    
    if (moh.name === 'default') {
      return res.status(422).json({ error: 'Cannot delete default MOH class' });
    }
    
    await moh.destroy();
    res.json({ success: 'Music on hold class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
