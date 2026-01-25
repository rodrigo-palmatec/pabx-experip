const express = require('express');
const router = express.Router();
const { Contact, Peer } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/contacts - List contacts
router.get('/', async (req, res) => {
  try {
    const { isPublic, peerId, search } = req.query;
    
    const where = {};
    
    if (isPublic === 'true') {
      where.isPublic = true;
    } else if (peerId) {
      where[Op.or] = [
        { isPublic: true },
        { peerId }
      ];
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } }
      ];
    }

    const contacts = await Contact.findAll({
      where,
      include: [{
        model: Peer,
        as: 'Owner',
        attributes: ['id', 'username', 'name']
      }],
      order: [['name', 'ASC']]
    });
    
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/contacts/public - List public contacts only
router.get('/public', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: { isPublic: true },
      order: [['name', 'ASC']]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id, {
      include: [{
        model: Peer,
        as: 'Owner',
        attributes: ['id', 'username', 'name']
      }]
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/contacts - Create contact
router.post('/', async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const contact = await Contact.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/contacts/:id - Update contact
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    await contact.destroy();
    res.json({ success: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
