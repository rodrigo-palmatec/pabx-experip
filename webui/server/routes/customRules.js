const express = require('express');
const router = express.Router();
const { CustomRule } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/customRules - List all custom rules
router.get('/', async (req, res) => {
  try {
    const rules = await CustomRule.findAll({
      order: [['priority', 'DESC'], ['name', 'ASC']]
    });
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/customRules/:id - Get custom rule by ID
router.get('/:id', async (req, res) => {
  try {
    const rule = await CustomRule.findByPk(req.params.id);
    if (!rule) {
      return res.status(404).json({ error: 'Custom rule not found' });
    }
    res.json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/customRules - Create custom rule
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const ruleData = { ...req.body };
    if (ruleData.conditions && typeof ruleData.conditions === 'object') {
      ruleData.conditions = JSON.stringify(ruleData.conditions);
    }
    if (ruleData.actions && typeof ruleData.actions === 'object') {
      ruleData.actions = JSON.stringify(ruleData.actions);
    }

    const rule = await CustomRule.create({
      ...ruleData,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/customRules/:id - Update custom rule
router.put('/:id', async (req, res) => {
  try {
    const rule = await CustomRule.findByPk(req.params.id);
    if (!rule) {
      return res.status(404).json({ error: 'Custom rule not found' });
    }

    const updateData = { ...req.body };
    if (updateData.conditions && typeof updateData.conditions === 'object') {
      updateData.conditions = JSON.stringify(updateData.conditions);
    }
    if (updateData.actions && typeof updateData.actions === 'object') {
      updateData.actions = JSON.stringify(updateData.actions);
    }
    updateData.updatedBy = req.user?.username || 'admin';

    await rule.update(updateData);
    res.json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/customRules/:id - Delete custom rule
router.delete('/:id', async (req, res) => {
  try {
    const rule = await CustomRule.findByPk(req.params.id);
    if (!rule) {
      return res.status(404).json({ error: 'Custom rule not found' });
    }
    await rule.destroy();
    res.json({ success: 'Custom rule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
