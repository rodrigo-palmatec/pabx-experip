const express = require('express');
const router = express.Router();
const { ServiceHour, Holiday } = require('../models');

// GET /api/service-hours-public - List all service hours (público)
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
    console.error('Erro ao listar horários:', error);
    res.status(500).json({ error: 'Erro ao listar horários' });
  }
});

module.exports = router;
