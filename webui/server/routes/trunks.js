const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const configManager = require('../services/config');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/trunks - Listar troncos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const ami = req.app.get('ami');
    const trunks = configManager.getTrunks();
    
    // Buscar status de registro
    let registrations = [];
    if (ami && ami.isConnected()) {
      try {
        registrations = await ami.getRegistry();
      } catch (err) {
        logger.warn('Não foi possível obter status de registro');
      }
    }
    
    const result = trunks.map(trunk => {
      const reg = registrations.find(r => r.clienturi && r.clienturi.includes(trunk.name));
      return {
        ...trunk,
        registered: reg ? reg.status === 'Registered' : false,
        status: reg ? reg.status : 'Unknown'
      };
    });
    
    res.json(result);
  } catch (err) {
    logger.error('Erro ao listar troncos:', err);
    res.status(500).json({ error: 'Erro ao listar troncos' });
  }
});

// POST /api/trunks - Criar tronco
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, host, username, password, context, codecs } = req.body;
    
    if (!name || !host) {
      return res.status(400).json({ error: 'Nome e host são obrigatórios' });
    }
    
    const trunkName = name.startsWith('trunk-') ? name : `trunk-${name}`;
    
    // Adicionar configuração do tronco ao pjsip.conf
    const content = configManager.readConfig('pjsip.conf');
    
    const trunkConfig = `
; Tronco ${trunkName}
[${trunkName}]
type = endpoint
context = ${context || 'from-trunk'}
disallow = all
allow = ${codecs || 'ulaw,alaw,g722'}
outbound_auth = ${trunkName}-auth
aors = ${trunkName}
direct_media = no
from_user = ${username || ''}
from_domain = ${host}

[${trunkName}-auth]
type = auth
auth_type = userpass
username = ${username || ''}
password = ${password || ''}

[${trunkName}]
type = aor
contact = sip:${host}
qualify_frequency = 60

[${trunkName}-registration]
type = registration
transport = transport-udp
outbound_auth = ${trunkName}-auth
server_uri = sip:${host}
client_uri = sip:${username || trunkName}@${host}
retry_interval = 60
expiration = 3600

[${trunkName}-identify]
type = identify
endpoint = ${trunkName}
match = ${host}
`;
    
    configManager.writeConfig('pjsip.conf', content + trunkConfig);
    
    const ami = req.app.get('ami');
    if (ami && ami.isConnected()) {
      await ami.reload('res_pjsip.so');
    }
    
    logger.info(`Tronco ${trunkName} criado por ${req.user.username}`);
    res.status(201).json({ message: 'Tronco criado com sucesso', name: trunkName });
  } catch (err) {
    logger.error('Erro ao criar tronco:', err);
    res.status(500).json({ error: 'Erro ao criar tronco' });
  }
});

// DELETE /api/trunks/:name - Excluir tronco
router.delete('/:name', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const trunkName = name.startsWith('trunk-') ? name : `trunk-${name}`;
    
    // Remover seções do tronco
    const content = configManager.readConfig('pjsip.conf');
    const lines = content.split('\n');
    const newLines = [];
    let skip = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith(`[${trunkName}]`) || 
          trimmed.startsWith(`[${trunkName}-`)) {
        skip = true;
        continue;
      }
      
      if (trimmed.startsWith('[') && !trimmed.startsWith(`[${trunkName}`)) {
        skip = false;
      }
      
      if (!skip) {
        newLines.push(line);
      }
    }
    
    configManager.writeConfig('pjsip.conf', newLines.join('\n'));
    
    const ami = req.app.get('ami');
    if (ami && ami.isConnected()) {
      await ami.reload('res_pjsip.so');
    }
    
    logger.info(`Tronco ${trunkName} excluído por ${req.user.username}`);
    res.json({ message: 'Tronco excluído com sucesso' });
  } catch (err) {
    logger.error('Erro ao excluir tronco:', err);
    res.status(500).json({ error: 'Erro ao excluir tronco' });
  }
});

module.exports = router;
