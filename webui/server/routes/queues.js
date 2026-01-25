const express = require('express');
const router = express.Router();
const { Queue, QueueMember, Peer } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/queues - List all queues
router.get('/', async (req, res) => {
  try {
    const queues = await Queue.findAll({
      include: [{
        model: QueueMember,
        as: 'Members',
        include: [{
          model: Peer,
          as: 'Peer',
          attributes: ['id', 'username', 'name', 'sipRegStatus']
        }]
      }],
      order: [['name', 'ASC']]
    });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/queues/:id - Get queue by ID
router.get('/:id', async (req, res) => {
  try {
    const queue = await Queue.findByPk(req.params.id, {
      include: [{
        model: QueueMember,
        as: 'Members',
        include: [{
          model: Peer,
          as: 'Peer',
          attributes: ['id', 'username', 'name', 'sipRegStatus']
        }]
      }]
    });
    if (!queue) {
      return res.status(404).json({ error: 'Queue not found' });
    }
    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/queues - Create queue
router.post('/', async (req, res) => {
  try {
    const {
      name, extension, strategy, timeout, maxWaitTime,
      wrapupTime, announceFrequency, announcePosition,
      announceHoldTime, mohClass, joinEmpty, leaveWhenEmpty,
      ringinuse, servicelevel, weight, memberIds
    } = req.body;

    if (!name || !extension) {
      return res.status(400).json({ error: 'Name and extension are required' });
    }

    const queue = await Queue.create({
      name,
      extension,
      strategy: strategy || 'ringall',
      timeout: timeout || 30,
      maxWaitTime: maxWaitTime || 300,
      wrapupTime: wrapupTime || 0,
      announceFrequency: announceFrequency || 60,
      announcePosition: announcePosition !== false,
      announceHoldTime: announceHoldTime !== false,
      mohClass: mohClass || 'default',
      joinEmpty: joinEmpty !== false,
      leaveWhenEmpty: leaveWhenEmpty || false,
      ringinuse: ringinuse || false,
      servicelevel: servicelevel || 60,
      weight: weight || 0,
      createdBy: req.user?.username || 'admin'
    });

    // Add members if provided
    if (memberIds && Array.isArray(memberIds) && memberIds.length > 0) {
      const memberData = memberIds.map((peerId, index) => ({
        queueId: queue.id,
        peerId,
        penalty: 0
      }));
      await QueueMember.bulkCreate(memberData, { ignoreDuplicates: true });
    }

    await queue.reload({
      include: [{
        model: QueueMember,
        as: 'Members',
        include: [{
          model: Peer,
          as: 'Peer',
          attributes: ['id', 'username', 'name']
        }]
      }]
    });

    res.status(201).json(queue);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Queue name or extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/queues/:id - Update queue
router.put('/:id', async (req, res) => {
  try {
    const queue = await Queue.findByPk(req.params.id);
    if (!queue) {
      return res.status(404).json({ error: 'Queue not found' });
    }

    const { memberIds, ...updateData } = req.body;
    updateData.updatedBy = req.user?.username || 'admin';

    await queue.update(updateData);

    // Update members if provided
    if (memberIds !== undefined) {
      await QueueMember.destroy({ where: { queueId: queue.id } });
      if (Array.isArray(memberIds) && memberIds.length > 0) {
        const memberData = memberIds.map(peerId => ({
          queueId: queue.id,
          peerId,
          penalty: 0
        }));
        await QueueMember.bulkCreate(memberData, { ignoreDuplicates: true });
      }
    }

    await queue.reload({
      include: [{
        model: QueueMember,
        as: 'Members',
        include: [{
          model: Peer,
          as: 'Peer',
          attributes: ['id', 'username', 'name']
        }]
      }]
    });

    res.json(queue);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Queue name or extension already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/queues/:id - Delete queue
router.delete('/:id', async (req, res) => {
  try {
    const queue = await Queue.findByPk(req.params.id);
    if (!queue) {
      return res.status(404).json({ error: 'Queue not found' });
    }

    await QueueMember.destroy({ where: { queueId: queue.id } });
    await queue.destroy();

    res.json({ success: 'Queue deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/queues/:id/members - Get queue members
router.get('/:id/members', async (req, res) => {
  try {
    const members = await QueueMember.findAll({
      where: { queueId: req.params.id },
      include: [{
        model: Peer,
        as: 'Peer',
        attributes: ['id', 'username', 'name', 'sipRegStatus']
      }]
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/queues/:id/members - Add member to queue
router.post('/:id/members', async (req, res) => {
  try {
    const { peerId, penalty } = req.body;
    const queue = await Queue.findByPk(req.params.id);
    
    if (!queue) {
      return res.status(404).json({ error: 'Queue not found' });
    }

    const [member] = await QueueMember.findOrCreate({
      where: { queueId: queue.id, peerId },
      defaults: { penalty: penalty || 0 }
    });

    await member.reload({
      include: [{
        model: Peer,
        as: 'Peer',
        attributes: ['id', 'username', 'name']
      }]
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/queues/:id/members/:memberId - Update member
router.put('/:id/members/:memberId', async (req, res) => {
  try {
    const member = await QueueMember.findByPk(req.params.memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update(req.body);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/queues/:id/members/:memberId - Remove member from queue
router.delete('/:id/members/:memberId', async (req, res) => {
  try {
    const result = await QueueMember.destroy({
      where: { id: req.params.memberId, queueId: req.params.id }
    });
    
    if (result === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ success: 'Member removed from queue' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/queues/:id/members/:memberId/pause - Pause member
router.post('/:id/members/:memberId/pause', async (req, res) => {
  try {
    const member = await QueueMember.findByPk(req.params.memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update({
      paused: true,
      pauseReason: req.body.reason || null
    });

    res.json({ success: 'Member paused' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/queues/:id/members/:memberId/unpause - Unpause member
router.post('/:id/members/:memberId/unpause', async (req, res) => {
  try {
    const member = await QueueMember.findByPk(req.params.memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update({
      paused: false,
      pauseReason: null
    });

    res.json({ success: 'Member unpaused' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
