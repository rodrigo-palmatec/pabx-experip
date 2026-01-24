const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const configManager = require('../services/config');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/extensions - Listar ramais
router.get('/', authenticateToken, async (req, res) => {
  try {
    const ami = req.app.get('ami');
    const extensions = configManager.getExtensions();
    
    // Buscar status dos endpoints
    let endpointStatus = [];
    if (ami && ami.isConnected()) {
      try {
        endpointStatus = await ami.pjsipEndpoints();
      } catch (err) {
        logger.warn('Não foi possível obter status dos endpoints');
      }
    }
    
    // Mesclar informações
    const result = extensions.map(ext => {
      const status = endpointStatus.find(s => s.objectname === ext.extension);
      return {
        ...ext,
        status: status ? status.devicestate : 'Unknown',
        online: status ? status.devicestate !== 'Unavailable' : false
      };
    });
    
    res.json(result);
  } catch (err) {
    logger.error('Erro ao listar ramais:', err);
    res.status(500).json({ error: 'Erro ao listar ramais' });
  }
});

// POST /api/extensions - Criar ramal
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { extension, name, password, context } = req.body;
    
    if (!extension || !name || !password) {
      return res.status(400).json({ error: 'Ramal, nome e senha são obrigatórios' });
    }
    
    // Validar formato do ramal
    if (!/^\d{3,6}$/.test(extension)) {
      return res.status(400).json({ error: 'Ramal deve ter entre 3 e 6 dígitos' });
    }
    
    // Verificar se já existe
    const existing = configManager.getExtensions();
    if (existing.find(e => e.extension === extension)) {
      return res.status(409).json({ error: 'Ramal já existe' });
    }
    
    configManager.addExtension({
      extension,
      name,
      password,
      context: context || 'internal'
    });
    
    // Recarregar PJSIP
    const ami = req.app.get('ami');
    if (ami && ami.isConnected()) {
      await ami.reload('res_pjsip.so');
    }
    
    logger.info(`Ramal ${extension} criado por ${req.user.username}`);
    res.status(201).json({ message: 'Ramal criado com sucesso', extension });
  } catch (err) {
    logger.error('Erro ao criar ramal:', err);
    res.status(500).json({ error: 'Erro ao criar ramal' });
  }
});

// PUT /api/extensions/:extension - Atualizar ramal
router.put('/:extension', authenticateToken, async (req, res) => {
  try {
    const { extension } = req.params;
    const { name, password, context } = req.body;
    
    // Remover e recriar
    configManager.deleteExtension(extension);
    configManager.addExtension({
      extension,
      name: name || extension,
      password: password || 'changeme',
      context: context || 'internal'
    });
    
    const ami = req.app.get('ami');
    if (ami && ami.isConnected()) {
      await ami.reload('res_pjsip.so');
    }
    
    logger.info(`Ramal ${extension} atualizado por ${req.user.username}`);
    res.json({ message: 'Ramal atualizado com sucesso' });
  } catch (err) {
    logger.error('Erro ao atualizar ramal:', err);
    res.status(500).json({ error: 'Erro ao atualizar ramal' });
  }
});

// DELETE /api/extensions/:extension - Excluir ramal
router.delete('/:extension', authenticateToken, async (req, res) => {
  try {
    const { extension } = req.params;
    
    configManager.deleteExtension(extension);
    
    const ami = req.app.get('ami');
    if (ami && ami.isConnected()) {
      await ami.reload('res_pjsip.so');
    }
    
    logger.info(`Ramal ${extension} excluído por ${req.user.username}`);
    res.json({ message: 'Ramal excluído com sucesso' });
  } catch (err) {
    logger.error('Erro ao excluir ramal:', err);
    res.status(500).json({ error: 'Erro ao excluir ramal' });
  }
});

module.exports = router;
