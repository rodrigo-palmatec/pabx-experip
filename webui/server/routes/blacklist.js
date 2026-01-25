const express = require('express');
const router = express.Router();
const { Blacklist } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/blacklist - List all blacklisted numbers
router.get('/', async (req, res) => {
  try {
    const blacklist = await Blacklist.findAll({
      order: [['number', 'ASC']]
    });
    res.json(blacklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blacklist/:id - Get blacklist entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Blacklist.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Blacklist entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/blacklist - Add number to blacklist
router.post('/', async (req, res) => {
  try {
    const { number, description, type } = req.body;
    if (!number) {
      return res.status(400).json({ error: 'Number is required' });
    }

    const entry = await Blacklist.create({
      number,
      description,
      type: type || 'inbound',
      enabled: req.body.enabled !== false,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(entry);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Number already in blacklist' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/blacklist/:id - Update blacklist entry
router.put('/:id', async (req, res) => {
  try {
    const entry = await Blacklist.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Blacklist entry not found' });
    }

    await entry.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(entry);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Number already in blacklist' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/blacklist/:id - Remove from blacklist
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Blacklist.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Blacklist entry not found' });
    }
    await entry.destroy();
    res.json({ success: 'Removed from blacklist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blacklist/check/:number - Check if number is blacklisted
router.get('/check/:number', async (req, res) => {
  try {
    const entry = await Blacklist.findOne({
      where: { 
        number: req.params.number,
        enabled: true
      }
    });
    res.json({
      isBlacklisted: !!entry,
      entry
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
