const express = require('express');
const router = express.Router();
const { Conference } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/conferences - List all conferences
router.get('/', async (req, res) => {
  try {
    const conferences = await Conference.findAll({
      order: [['name', 'ASC']]
    });
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/conferences/:id - Get conference by ID
router.get('/:id', async (req, res) => {
  try {
    const conference = await Conference.findByPk(req.params.id);
    if (!conference) {
      return res.status(404).json({ error: 'Conference not found' });
    }
    res.json(conference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/conferences - Create conference
router.post('/', async (req, res) => {
  try {
    const { name, extension } = req.body;
    if (!name || !extension) {
      return res.status(400).json({ error: 'Name and extension are required' });
    }

    const conference = await Conference.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(conference);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Conference extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/conferences/:id - Update conference
router.put('/:id', async (req, res) => {
  try {
    const conference = await Conference.findByPk(req.params.id);
    if (!conference) {
      return res.status(404).json({ error: 'Conference not found' });
    }

    await conference.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(conference);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Conference extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/conferences/:id - Delete conference
router.delete('/:id', async (req, res) => {
  try {
    const conference = await Conference.findByPk(req.params.id);
    if (!conference) {
      return res.status(404).json({ error: 'Conference not found' });
    }
    await conference.destroy();
    res.json({ success: 'Conference deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
