const express = require('express');
const router = express.Router();
const { Profile, Peer, OutboundRoute, ProfileRoute } = require('../models');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// GET /api/profiles - List all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [{
        model: OutboundRoute,
        as: 'OutRoutes',
        attributes: ['id', 'name', 'pattern'],
        through: { attributes: [] }
      }],
      order: [['name', 'ASC']]
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/profiles/:id - Get profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: [
        {
          model: OutboundRoute,
          as: 'OutRoutes',
          attributes: ['id', 'name', 'pattern', 'trunkId'],
          through: { attributes: [] }
        },
        {
          model: Peer,
          as: 'Peers',
          attributes: ['id', 'username', 'name']
        }
      ]
    });
    if (!profile) {
      return res.status(404).json({ error: `Profile id ${req.params.id} not found` });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/profiles - Create profile
router.post('/', async (req, res) => {
  try {
    const { name, description, outRouteIds } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const profile = await Profile.create({
      name,
      description,
      createdBy: req.user?.username || 'admin'
    });

    // Add outbound routes if provided
    if (outRouteIds && Array.isArray(outRouteIds) && outRouteIds.length > 0) {
      const profileRouteData = outRouteIds.map(outboundRouteId => ({
        profileId: profile.id,
        outboundRouteId
      }));
      await ProfileRoute.bulkCreate(profileRouteData, { ignoreDuplicates: true });
    }

    await profile.reload({
      include: [{
        model: OutboundRoute,
        as: 'OutRoutes',
        attributes: ['id', 'name', 'pattern'],
        through: { attributes: [] }
      }]
    });

    res.status(201).json(profile);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Profile name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/profiles/:id - Update profile
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: `Profile id ${req.params.id} not found` });
    }

    const { outRouteIds, ...updateData } = req.body;
    updateData.updatedBy = req.user?.username || 'admin';

    await profile.update(updateData);

    // Update outbound routes if provided
    if (outRouteIds !== undefined) {
      await ProfileRoute.destroy({ where: { profileId: profile.id } });
      if (Array.isArray(outRouteIds) && outRouteIds.length > 0) {
        const profileRouteData = outRouteIds.map(outboundRouteId => ({
          profileId: profile.id,
          outboundRouteId
        }));
        await ProfileRoute.bulkCreate(profileRouteData, { ignoreDuplicates: true });
      }
    }

    await profile.reload({
      include: [{
        model: OutboundRoute,
        as: 'OutRoutes',
        attributes: ['id', 'name', 'pattern'],
        through: { attributes: [] }
      }]
    });

    res.json(profile);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'Profile name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/profiles/:id - Delete profile
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: `Profile id ${req.params.id} not found` });
    }

    // Check if profile has peers
    const peersCount = await Peer.count({ where: { profileId: req.params.id } });
    if (peersCount > 0) {
      return res.status(422).json({ 
        error: `Cannot delete profile with ${peersCount} associated peer(s)` 
      });
    }

    await ProfileRoute.destroy({ where: { profileId: profile.id } });
    await profile.destroy();

    res.json({ success: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
