const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// POST /api/system/update - Atualizar sistema
router.post('/update', async (req, res) => {
  try {
    const projectDir = '/opt/pabx-experip-webui';
    
    // Verificar se estamos no diretório correto
    if (!await fs.access(projectDir).catch(() => false)) {
      return res.status(400).json({ error: 'Diretório do projeto não encontrado' });
    }
    
    // Executar git pull
    const { stdout: gitOutput } = await execAsync('git pull origin master', {
      cwd: projectDir,
      timeout: 30000
    });
    
    // Fazer build do frontend
    await execAsync('cd webui/client && npm run build', {
      cwd: projectDir,
      timeout: 120000
    });
    
    // Reiniciar serviço
    await execAsync('systemctl restart pabx-webui', {
      timeout: 10000
    });
    
    res.json({
      success: true,
      message: 'Sistema atualizado com sucesso',
      gitOutput: gitOutput,
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('Erro ao atualizar sistema:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.stdout || error.stderr
    });
  }
});

// Função auxiliar para executar comandos com Promise
function execAsync(command, options = {}) {
  return new Promise((resolve, reject) => {
    const timeout = options.timeout || 10000;
    const child = exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
    
    // Timeout
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Comando timeout após ${timeout}ms`));
    }, timeout);
  });
}

module.exports = router;
