const express = require('express');
const router = express.Router();
const { Holiday, ServiceHour } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/holidays - List all holidays
router.get('/', async (req, res) => {
  try {
    const holidays = await Holiday.findAll({
      include: [{
        model: ServiceHour,
        as: 'ServiceHour',
        attributes: ['id', 'name']
      }],
      order: [['date', 'ASC']]
    });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/holidays/:id - Get holiday by ID
router.get('/:id', async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id, {
      include: [{
        model: ServiceHour,
        as: 'ServiceHour'
      }]
    });
    if (!holiday) {
      return res.status(404).json({ error: 'Holiday not found' });
    }
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/holidays - Create holiday
router.post('/', async (req, res) => {
  try {
    const { name, date } = req.body;
    if (!name || !date) {
      return res.status(400).json({ error: 'Name and date are required' });
    }

    const holiday = await Holiday.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/holidays/:id - Update holiday
router.put('/:id', async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id);
    if (!holiday) {
      return res.status(404).json({ error: 'Holiday not found' });
    }

    await holiday.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/holidays/:id - Delete holiday
router.delete('/:id', async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id);
    if (!holiday) {
      return res.status(404).json({ error: 'Holiday not found' });
    }
    await holiday.destroy();
    res.json({ success: 'Holiday deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/holidays/check/today - Check if today is a holiday
router.get('/check/today', async (req, res) => {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const monthDay = todayStr.substring(5); // MM-DD for recurring

    const holidays = await Holiday.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { date: todayStr },
          { 
            recurring: true,
            date: { [require('sequelize').Op.like]: `%-${monthDay}` }
          }
        ]
      }
    });

    res.json({
      isHoliday: holidays.length > 0,
      holidays
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
