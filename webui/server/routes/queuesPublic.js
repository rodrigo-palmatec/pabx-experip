const express = require('express');
const router = express.Router();
const { Queue } = require('../models');

// GET /api/queues-public - List all queues (público)
router.get('/', async (req, res) => {
  try {
    const queues = await Queue.findAll({
      order: [['name', 'ASC']]
    });
    res.json(queues);
  } catch (error) {
    console.error('Erro ao listar filas:', error);
    res.status(500).json({ error: 'Erro ao listar filas' });
  }
});

module.exports = router;
