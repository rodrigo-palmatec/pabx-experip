const express = require('express');
const router = express.Router();
const { Peer, Category, Profile, CostCenter, Group, PeerGroup, User } = require('../models');
const configService = require('../services/config');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/peers - List all peers
router.get('/', async (req, res) => {
  try {
    const peers = await Peer.findAll({
      include: [
        { model: Category, as: 'Category', attributes: ['id', 'name', 'callLimit'] },
        { model: Profile, as: 'Profile', attributes: ['id', 'name'] },
        { model: CostCenter, as: 'CostCenter', attributes: ['id', 'name'] },
        { model: Group, as: 'Groups', attributes: ['id', 'name'], through: { attributes: [] } },
        { model: User, as: 'User', attributes: ['id', 'name'] }
      ],
      order: [['username', 'ASC']]
    });
    res.json(peers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/peers/:id - Get peer by ID
router.get('/:id', async (req, res) => {
  try {
    const peer = await Peer.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'Category' },
        { model: Profile, as: 'Profile' },
        { model: CostCenter, as: 'CostCenter' },
        { model: Group, as: 'Groups', through: { attributes: [] } },
        { model: User, as: 'User', attributes: ['id', 'name'] }
      ]
    });
    if (!peer) {
      return res.status(404).json({ error: `Peer id ${req.params.id} not found` });
    }
    res.json(peer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/peers - Create peer
router.post('/', async (req, res) => {
  try {
    const {
      username, secret, name, email, callCenter, hideOnAgenda,
      dynamic, webrtc, provisioning, deviceBrand, deviceModel, deviceMac,
      context, callerid, profileId, categoryId, costCenterId, groupIds
    } = req.body;

    if (!username || !secret || !name) {
      return res.status(400).json({ error: 'Username, secret and name are required' });
    }

    const peer = await Peer.create({
      username,
      secret,
      name,
      email,
      callCenter: callCenter || false,
      hideOnAgenda: hideOnAgenda || false,
      dynamic: dynamic !== false,
      webrtc: webrtc || false,
      provisioning: provisioning || false,
      deviceBrand,
      deviceModel,
      deviceMac,
      context: context || 'internal',
      callerid: callerid || `"${name}" <${username}>`,
      profileId,
      categoryId,
      costCenterId,
      createdBy: req.user?.username || 'admin'
    });

    // Add groups if provided
    if (groupIds && Array.isArray(groupIds) && groupIds.length > 0) {
      const peerGroupData = groupIds.map(groupId => ({
        peerId: peer.id,
        groupId
      }));
      await PeerGroup.bulkCreate(peerGroupData, { ignoreDuplicates: true });
    }

    // Sync to Asterisk config
    try {
      await configService.addExtension({
        extension: username,
        name: name,
        password: secret,
        context: context || 'internal'
      });
    } catch (configError) {
      console.error('Error syncing to Asterisk:', configError);
    }

    await peer.reload({
      include: [
        { model: Category, as: 'Category', attributes: ['id', 'name'] },
        { model: Profile, as: 'Profile', attributes: ['id', 'name'] },
        { model: CostCenter, as: 'CostCenter', attributes: ['id', 'name'] },
        { model: Group, as: 'Groups', attributes: ['id', 'name'], through: { attributes: [] } }
      ]
    });

    res.status(201).json(peer);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Peer username already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/peers/:id - Update peer
router.put('/:id', async (req, res) => {
  try {
    const peer = await Peer.findByPk(req.params.id);
    if (!peer) {
      return res.status(404).json({ error: `Peer id ${req.params.id} not found` });
    }

    const { groupIds, ...updateData } = req.body;
    updateData.updatedBy = req.user?.username || 'admin';

    // Update callerid if name changed
    if (updateData.name && !updateData.callerid) {
      updateData.callerid = `"${updateData.name}" <${peer.username}>`;
    }

    await peer.update(updateData);

    // Update groups if provided
    if (groupIds !== undefined) {
      await PeerGroup.destroy({ where: { peerId: peer.id } });
      if (Array.isArray(groupIds) && groupIds.length > 0) {
        const peerGroupData = groupIds.map(groupId => ({
          peerId: peer.id,
          groupId
        }));
        await PeerGroup.bulkCreate(peerGroupData, { ignoreDuplicates: true });
      }
    }

    await peer.reload({
      include: [
        { model: Category, as: 'Category', attributes: ['id', 'name'] },
        { model: Profile, as: 'Profile', attributes: ['id', 'name'] },
        { model: CostCenter, as: 'CostCenter', attributes: ['id', 'name'] },
        { model: Group, as: 'Groups', attributes: ['id', 'name'], through: { attributes: [] } }
      ]
    });

    res.json(peer);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Peer username already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/peers/:id - Delete peer
router.delete('/:id', async (req, res) => {
  try {
    const peer = await Peer.findByPk(req.params.id);
    if (!peer) {
      return res.status(404).json({ error: 'Peer not found' });
    }

    // Remove from groups
    await PeerGroup.destroy({ where: { peerId: peer.id } });

    // Remove from Asterisk config
    try {
      await configService.deleteExtension(peer.username);
    } catch (configError) {
      console.error('Error removing from Asterisk:', configError);
    }

    await peer.destroy();
    res.json({ success: 'Peer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
