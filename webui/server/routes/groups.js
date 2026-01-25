const express = require('express');
const router = express.Router();
const { Group, Peer, PeerGroup } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/groups - List all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name'],
        through: { attributes: [] }
      }],
      order: [['name', 'ASC']]
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/groups/:id - Get group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name', 'sipRegStatus'],
        through: { attributes: [] }
      }]
    });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/groups - Create group
router.post('/', async (req, res) => {
  try {
    const { name, description, ringStrategy, ringTime, peerIds } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const group = await Group.create({
      name,
      description,
      ringStrategy: ringStrategy || 'ringall',
      ringTime: ringTime || 20,
      createdBy: req.user?.username || 'admin'
    });

    // Add peers to group if provided
    if (peerIds && Array.isArray(peerIds) && peerIds.length > 0) {
      const peerGroupData = peerIds.map(peerId => ({
        groupId: group.id,
        peerId
      }));
      await PeerGroup.bulkCreate(peerGroupData, { ignoreDuplicates: true });
    }

    // Reload with peers
    await group.reload({
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name'],
        through: { attributes: [] }
      }]
    });

    res.status(201).json(group);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Group name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/groups/:id - Update group
router.put('/:id', async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const { peerIds, ...updateData } = req.body;
    updateData.updatedBy = req.user?.username || 'admin';

    await group.update(updateData);

    // Update peers if provided
    if (peerIds !== undefined) {
      await PeerGroup.destroy({ where: { groupId: group.id } });
      if (Array.isArray(peerIds) && peerIds.length > 0) {
        const peerGroupData = peerIds.map(peerId => ({
          groupId: group.id,
          peerId
        }));
        await PeerGroup.bulkCreate(peerGroupData, { ignoreDuplicates: true });
      }
    }

    await group.reload({
      include: [{
        model: Peer,
        as: 'Peers',
        attributes: ['id', 'username', 'name'],
        through: { attributes: [] }
      }]
    });

    res.json(group);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Group name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/groups/:id - Delete group
router.delete('/:id', async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Remove peer associations
    await PeerGroup.destroy({ where: { groupId: group.id } });
    await group.destroy();

    res.json({ success: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/groups/:id/members - Add peer to group
router.post('/:id/members', async (req, res) => {
  try {
    const { peerId } = req.body;
    const group = await Group.findByPk(req.params.id);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    await PeerGroup.findOrCreate({
      where: { groupId: group.id, peerId }
    });

    res.json({ success: 'Peer added to group' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/groups/:id/members/:peerId - Remove peer from group
router.delete('/:id/members/:peerId', async (req, res) => {
  try {
    await PeerGroup.destroy({
      where: { 
        groupId: req.params.id, 
        peerId: req.params.peerId 
      }
    });
    res.json({ success: 'Peer removed from group' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
