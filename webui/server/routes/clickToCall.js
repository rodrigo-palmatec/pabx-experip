const express = require('express');
const router = express.Router();
const { ClickToCall, Peer } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// POST /api/calls - Make a click-to-call
router.post('/', async (req, res) => {
  try {
    const { origem, destino } = req.body;
    
    if (!origem || !destino) {
      return res.status(400).json({ error: 'origem and destino are required' });
    }

    const ami = req.app.get('ami');
    if (!ami || !ami.connected) {
      return res.status(503).json({ error: 'AMI not connected' });
    }

    // Generate unique ID
    const uniqueid = `clicktocall-${Date.now()}`;

    // Originate call
    const action = {
      action: 'Originate',
      channel: `PJSIP/${origem}`,
      context: 'clicktocall',
      exten: destino,
      priority: 1,
      callerid: `"Click2Call" <${origem}>`,
      timeout: 30000,
      async: true,
      variable: {
        CLICKTOCALL_DEST: destino,
        CLICKTOCALL_UNIQUEID: uniqueid
      }
    };

    const response = await ami.action(action);

    if (response.response === 'Success') {
      res.status(201).json({
        exten: origem,
        destination: destino,
        profile: 'interno',
        context: 'clicktocall',
        uniqueid,
        callStatus: 'Call initiated'
      });
    } else {
      res.status(400).json({ 
        error: response.message || 'Failed to initiate call' 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /nativeApis - Get click-to-call configuration
router.get('/config', async (req, res) => {
  try {
    const config = await ClickToCall.findOne({
      where: { name: 'clickToCall' }
    });
    
    if (!config) {
      return res.status(404).json({ error: 'Click-to-call configuration not found' });
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /nativeApis/:id - Update click-to-call configuration
router.put('/config/:id', async (req, res) => {
  try {
    const config = await ClickToCall.findByPk(req.params.id);
    
    if (!config) {
      return res.status(404).json({ error: 'Click-to-call configuration not found' });
    }

    await config.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
