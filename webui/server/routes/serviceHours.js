const express = require('express');
const router = express.Router();
const { ServiceHour, Holiday } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/serviceHours - List all service hours
router.get('/', async (req, res) => {
  try {
    const serviceHours = await ServiceHour.findAll({
      include: [{
        model: Holiday,
        as: 'Holidays',
        attributes: ['id', 'name', 'date', 'recurring']
      }],
      order: [['name', 'ASC']]
    });
    res.json(serviceHours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/serviceHours/:id - Get service hour by ID
router.get('/:id', async (req, res) => {
  try {
    const serviceHour = await ServiceHour.findByPk(req.params.id, {
      include: [{
        model: Holiday,
        as: 'Holidays'
      }]
    });
    if (!serviceHour) {
      return res.status(404).json({ error: 'Service hour not found' });
    }
    res.json(serviceHour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/serviceHours - Create service hour
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Parse time ranges for each day
    const serviceHour = await ServiceHour.create({
      name: req.body.name,
      description: req.body.description,
      monday: JSON.stringify(req.body.monday || []),
      tuesday: JSON.stringify(req.body.tuesday || []),
      wednesday: JSON.stringify(req.body.wednesday || []),
      thursday: JSON.stringify(req.body.thursday || []),
      friday: JSON.stringify(req.body.friday || []),
      saturday: JSON.stringify(req.body.saturday || []),
      sunday: JSON.stringify(req.body.sunday || []),
      enabled: req.body.enabled !== false,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(serviceHour);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Service hour name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/serviceHours/:id - Update service hour
router.put('/:id', async (req, res) => {
  try {
    const serviceHour = await ServiceHour.findByPk(req.params.id);
    if (!serviceHour) {
      return res.status(404).json({ error: 'Service hour not found' });
    }

    const updateData = { ...req.body };
    
    // Stringify day arrays if provided
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => {
      if (updateData[day] && Array.isArray(updateData[day])) {
        updateData[day] = JSON.stringify(updateData[day]);
      }
    });

    updateData.updatedBy = req.user?.username || 'admin';
    await serviceHour.update(updateData);
    
    res.json(serviceHour);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Service hour name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/serviceHours/:id - Delete service hour
router.delete('/:id', async (req, res) => {
  try {
    const serviceHour = await ServiceHour.findByPk(req.params.id);
    if (!serviceHour) {
      return res.status(404).json({ error: 'Service hour not found' });
    }
    await serviceHour.destroy();
    res.json({ success: 'Service hour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if currently in service hours
router.get('/:id/check', async (req, res) => {
  try {
    const serviceHour = await ServiceHour.findByPk(req.params.id);
    if (!serviceHour) {
      return res.status(404).json({ error: 'Service hour not found' });
    }

    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[now.getDay()];
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    let dayRanges = [];
    try {
      dayRanges = JSON.parse(serviceHour[currentDay] || '[]');
    } catch (e) {
      dayRanges = [];
    }

    let isOpen = false;
    for (const range of dayRanges) {
      if (currentTime >= range.start && currentTime <= range.end) {
        isOpen = true;
        break;
      }
    }

    res.json({ 
      isOpen,
      currentTime,
      currentDay,
      ranges: dayRanges
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
