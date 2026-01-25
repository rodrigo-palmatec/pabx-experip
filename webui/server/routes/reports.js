const express = require('express');
const router = express.Router();
const { CDR, Trunk, Queue, CostCenter, Peer } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../database');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/reports/calls - Get call reports
router.get('/calls', async (req, res) => {
  try {
    const {
      startDate, endDate, src, dst, disposition,
      callType, trunkId, queueId, costCenterId,
      limit = 100, offset = 0
    } = req.query;

    const where = {};

    if (startDate && endDate) {
      where.calldate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    } else if (startDate) {
      where.calldate = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      where.calldate = { [Op.lte]: new Date(endDate) };
    }

    if (src) where.src = { [Op.like]: `%${src}%` };
    if (dst) where.dst = { [Op.like]: `%${dst}%` };
    if (disposition) where.disposition = disposition;
    if (callType) where.callType = callType;
    if (trunkId) where.trunkId = trunkId;
    if (queueId) where.queueId = queueId;
    if (costCenterId) where.costCenterId = costCenterId;

    const { count, rows } = await CDR.findAndCountAll({
      where,
      include: [
        { model: Trunk, as: 'Trunk', attributes: ['id', 'name'] },
        { model: Queue, as: 'Queue', attributes: ['id', 'name'] },
        { model: CostCenter, as: 'CostCenter', attributes: ['id', 'name'] }
      ],
      order: [['calldate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
      data: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/reports/summary - Get call summary
router.get('/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = {};
    if (startDate && endDate) {
      where.calldate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    const totalCalls = await CDR.count({ where });
    const answeredCalls = await CDR.count({ where: { ...where, disposition: 'ANSWERED' } });
    const missedCalls = await CDR.count({ where: { ...where, disposition: 'NO ANSWER' } });
    const busyCalls = await CDR.count({ where: { ...where, disposition: 'BUSY' } });
    const failedCalls = await CDR.count({ where: { ...where, disposition: 'FAILED' } });

    const avgDuration = await CDR.findOne({
      where: { ...where, disposition: 'ANSWERED' },
      attributes: [[sequelize.fn('AVG', sequelize.col('billsec')), 'avgDuration']]
    });

    const totalDuration = await CDR.findOne({
      where: { ...where, disposition: 'ANSWERED' },
      attributes: [[sequelize.fn('SUM', sequelize.col('billsec')), 'totalDuration']]
    });

    // Calls by type
    const byType = await CDR.findAll({
      where,
      attributes: [
        'callType',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['callType']
    });

    // Calls by disposition
    const byDisposition = await CDR.findAll({
      where,
      attributes: [
        'disposition',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['disposition']
    });

    res.json({
      totalCalls,
      answeredCalls,
      missedCalls,
      busyCalls,
      failedCalls,
      avgDuration: avgDuration?.dataValues?.avgDuration || 0,
      totalDuration: totalDuration?.dataValues?.totalDuration || 0,
      answerRate: totalCalls > 0 ? ((answeredCalls / totalCalls) * 100).toFixed(2) : 0,
      byType,
      byDisposition
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/reports/by-peer - Calls by peer
router.get('/by-peer', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = {};
    if (startDate && endDate) {
      where.calldate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    const outbound = await CDR.findAll({
      where,
      attributes: [
        'src',
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalCalls'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN disposition = 'ANSWERED' THEN 1 ELSE 0 END")), 'answered'],
        [sequelize.fn('SUM', sequelize.col('billsec')), 'totalDuration']
      ],
      group: ['src'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 50
    });

    const inbound = await CDR.findAll({
      where,
      attributes: [
        'dst',
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalCalls'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN disposition = 'ANSWERED' THEN 1 ELSE 0 END")), 'answered'],
        [sequelize.fn('SUM', sequelize.col('billsec')), 'totalDuration']
      ],
      group: ['dst'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 50
    });

    res.json({ outbound, inbound });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/reports/by-trunk - Calls by trunk
router.get('/by-trunk', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = { trunkId: { [Op.not]: null } };
    if (startDate && endDate) {
      where.calldate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    const results = await CDR.findAll({
      where,
      include: [{ model: Trunk, as: 'Trunk', attributes: ['id', 'name'] }],
      attributes: [
        'trunkId',
        [sequelize.fn('COUNT', sequelize.col('CDR.id')), 'totalCalls'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN disposition = 'ANSWERED' THEN 1 ELSE 0 END")), 'answered'],
        [sequelize.fn('SUM', sequelize.col('billsec')), 'totalDuration']
      ],
      group: ['trunkId', 'Trunk.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('CDR.id')), 'DESC']]
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/reports/by-cost-center - Calls by cost center
router.get('/by-cost-center', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = { costCenterId: { [Op.not]: null } };
    if (startDate && endDate) {
      where.calldate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    const results = await CDR.findAll({
      where,
      include: [{ model: CostCenter, as: 'CostCenter', attributes: ['id', 'name'] }],
      attributes: [
        'costCenterId',
        [sequelize.fn('COUNT', sequelize.col('CDR.id')), 'totalCalls'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN disposition = 'ANSWERED' THEN 1 ELSE 0 END")), 'answered'],
        [sequelize.fn('SUM', sequelize.col('billsec')), 'totalDuration']
      ],
      group: ['costCenterId', 'CostCenter.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('CDR.id')), 'DESC']]
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/reports/hourly - Calls by hour
router.get('/hourly', async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const results = await CDR.findAll({
      where: {
        calldate: { [Op.between]: [startOfDay, endOfDay] }
      },
      attributes: [
        [sequelize.fn('strftime', '%H', sequelize.col('calldate')), 'hour'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalCalls'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN disposition = 'ANSWERED' THEN 1 ELSE 0 END")), 'answered']
      ],
      group: [sequelize.fn('strftime', '%H', sequelize.col('calldate'))],
      order: [[sequelize.fn('strftime', '%H', sequelize.col('calldate')), 'ASC']]
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
