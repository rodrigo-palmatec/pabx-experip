const express = require('express');
const router = express.Router();
const { Category, Peer } = require('../models');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/categories - List all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name']
      }],
      order: [['name', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:id - Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name']
      }]
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/categories - Create category
router.post('/', async (req, res) => {
  try {
    const {
      name, description, nat, voicemail, lock, followme,
      passwordCall, monitor, callLimit, timeout,
      timeRestrictionStart, timeRestrictionEnd, overflowExtension
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await Category.create({
      name,
      description,
      nat: nat !== undefined ? nat : true,
      voicemail: voicemail !== undefined ? voicemail : true,
      lock: lock || false,
      followme: followme || false,
      passwordCall: passwordCall || false,
      monitor: monitor || 'none',
      callLimit: callLimit || 1,
      timeout: timeout || 60,
      timeRestrictionStart,
      timeRestrictionEnd,
      overflowExtension,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/categories/:id - Update category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updateData = { ...req.body };
    updateData.updatedBy = req.user?.username || 'admin';

    await category.update(updateData);
    res.json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/categories/:id - Delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category has peers
    const peersCount = await Peer.count({ where: { categoryId: req.params.id } });
    if (peersCount > 0) {
      return res.status(422).json({ 
        error: `Cannot delete category with ${peersCount} associated peer(s)` 
      });
    }

    await category.destroy();
    res.json({ success: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
