const express = require('express');
const router = express.Router();
const { Ivr } = require('../models');

// GET /api/ivrs-public - List all IVRs (público)
router.get('/', async (req, res) => {
  try {
    const ivrs = await Ivr.findAll({
      order: [['name', 'ASC']]
    });
    res.json(ivrs);
  } catch (error) {
    console.error('Erro ao listar URAs:', error);
    res.status(500).json({ error: 'Erro ao listar URAs' });
  }
});

module.exports = router;
