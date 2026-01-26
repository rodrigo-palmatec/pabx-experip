const express = require('express');
const router = express.Router();
const ami = require('../services/ami');
const { Peer } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/status/peers - Obter status em tempo real dos peers
router.get('/peers', async (req, res) => {
  try {
    // Obter peers do banco
    const dbPeers = await Peer.findAll({
      attributes: ['id', 'username', 'name', 'sipRegStatus']
    });

    // Obter status atual via AMI
    let amiPeers = [];
    try {
      if (ami.connected) {
        // Tentar PJSIP primeiro (mais moderno)
        amiPeers = await ami.pjsipEndpoints();
        
        // Se não tiver PJSIP, tentar SIP tradicional
        if (amiPeers.length === 0) {
          const sipResult = await ami.sipPeers();
          if (sipResult && sipResult.events) {
            amiPeers = sipResult.events.filter(event => event.event === 'PeerEntry');
          }
        }
      }
    } catch (amiError) {
      console.warn('Erro ao obter status via AMI:', amiError.message);
    }

    // Mapear status AMI para status do banco
    const statusMap = {};
    amiPeers.forEach(peer => {
      const username = peer.objectname || peer.channel || peer.peer;
      if (username) {
        let status = 'UNAVAILABLE';
        
        if (peer.status) {
          const s = peer.status.toUpperCase();
          if (s.includes('OK') || s.includes('REACHABLE') || s === 'AVAILABLE') {
            status = 'AVAILABLE';
          } else if (s.includes('BUSY') || s.includes('INUSE')) {
            status = 'BUSY';
          } else if (s.includes('RINGING')) {
            status = 'RINGING';
          } else if (s.includes('PAUSED')) {
            status = 'PAUSED';
          }
        }
        
        // Para PJSIP
        if (peer.state) {
          const s = peer.state.toUpperCase();
          if (s === 'ONLINE' || s === 'AVAILABLE') {
            status = 'AVAILABLE';
          } else if (s === 'BUSY' || s === 'INUSE') {
            status = 'BUSY';
          } else if (s === 'RINGING') {
            status = 'RINGING';
          }
        }
        
        statusMap[username] = status;
      }
    });

    // Combinar dados do banco com status AMI
    const peersWithStatus = dbPeers.map(peer => ({
      ...peer.toJSON(),
      sipRegStatus: statusMap[peer.username] || peer.sipRegStatus || 'UNAVAILABLE',
      lastSeen: new Date()
    }));

    // Atualizar banco com status atual
    for (const peer of peersWithStatus) {
      await Peer.update(
        { sipRegStatus: peer.sipRegStatus },
        { where: { id: peer.id } }
      );
    }

    res.json(peersWithStatus);
  } catch (error) {
    console.error('Erro ao obter status dos peers:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/status/calls - Obter chamadas ativas
router.get('/calls', async (req, res) => {
  try {
    let activeCalls = [];
    
    if (ami.connected) {
      try {
        activeCalls = await ami.getActiveCalls();
      } catch (amiError) {
        console.warn('Erro ao obter chamadas ativas:', amiError.message);
      }
    }

    res.json({
      calls: activeCalls,
      total: activeCalls.length,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/status/system - Status geral do sistema
router.get('/system', async (req, res) => {
  try {
    const [totalPeers, availablePeers, busyPeers] = await Promise.all([
      Peer.count(),
      Peer.count({ where: { sipRegStatus: 'AVAILABLE' } }),
      Peer.count({ where: { sipRegStatus: 'BUSY' } })
    ]);

    let activeCalls = 0;
    let amiConnected = false;

    if (ami.connected) {
      amiConnected = true;
      try {
        const calls = await ami.getActiveCalls();
        activeCalls = calls.length;
      } catch (error) {
        // Ignorar erro de AMI
      }
    }

    res.json({
      peers: {
        total: totalPeers,
        available: availablePeers,
        busy: busyPeers,
        unavailable: totalPeers - availablePeers - busyPeers
      },
      calls: {
        active: activeCalls,
        total: activeCalls
      },
      ami: {
        connected: amiConnected
      },
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
