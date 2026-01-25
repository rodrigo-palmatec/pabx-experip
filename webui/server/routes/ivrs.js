const express = require('express');
const router = express.Router();
const { IVR, IVROption } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/ivrs - List all IVRs
router.get('/', async (req, res) => {
  try {
    const ivrs = await IVR.findAll({
      include: [{
        model: IVROption,
        as: 'Options'
      }],
      order: [['name', 'ASC']]
    });
    res.json(ivrs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/ivrs/:id - Get IVR by ID
router.get('/:id', async (req, res) => {
  try {
    const ivr = await IVR.findByPk(req.params.id, {
      include: [{
        model: IVROption,
        as: 'Options'
      }]
    });
    if (!ivr) {
      return res.status(404).json({ error: 'IVR not found' });
    }
    res.json(ivr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ivrs - Create IVR
router.post('/', async (req, res) => {
  try {
    const { name, extension, options, ...ivrData } = req.body;
    
    if (!name || !extension) {
      return res.status(400).json({ error: 'Name and extension are required' });
    }

    const ivr = await IVR.create({
      name,
      extension,
      ...ivrData,
      createdBy: req.user?.username || 'admin'
    });

    // Create options if provided
    if (options && Array.isArray(options)) {
      const optionsData = options.map(opt => ({
        ivrId: ivr.id,
        digit: opt.digit,
        destinationType: opt.destinationType,
        destinationId: opt.destinationId,
        destinationData: opt.destinationData
      }));
      await IVROption.bulkCreate(optionsData);
    }

    await ivr.reload({
      include: [{ model: IVROption, as: 'Options' }]
    });

    res.status(201).json(ivr);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'IVR extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/ivrs/:id - Update IVR
router.put('/:id', async (req, res) => {
  try {
    const ivr = await IVR.findByPk(req.params.id);
    if (!ivr) {
      return res.status(404).json({ error: 'IVR not found' });
    }

    const { options, ...updateData } = req.body;
    updateData.updatedBy = req.user?.username || 'admin';

    await ivr.update(updateData);

    // Update options if provided
    if (options !== undefined) {
      await IVROption.destroy({ where: { ivrId: ivr.id } });
      if (Array.isArray(options) && options.length > 0) {
        const optionsData = options.map(opt => ({
          ivrId: ivr.id,
          digit: opt.digit,
          destinationType: opt.destinationType,
          destinationId: opt.destinationId,
          destinationData: opt.destinationData
        }));
        await IVROption.bulkCreate(optionsData);
      }
    }

    await ivr.reload({
      include: [{ model: IVROption, as: 'Options' }]
    });

    res.json(ivr);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'IVR extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/ivrs/:id - Delete IVR
router.delete('/:id', async (req, res) => {
  try {
    const ivr = await IVR.findByPk(req.params.id);
    if (!ivr) {
      return res.status(404).json({ error: 'IVR not found' });
    }

    await IVROption.destroy({ where: { ivrId: ivr.id } });
    await ivr.destroy();

    res.json({ success: 'IVR deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
