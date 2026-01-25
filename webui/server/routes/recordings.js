const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');

// Diretório padrão de gravações do Asterisk
const RECORDINGS_DIR = process.env.RECORDINGS_DIR || '/var/spool/asterisk/monitor';

router.use(authenticateToken);

// GET /api/recordings - List recordings with filters
router.get('/', async (req, res) => {
  try {
    const { date, src, dst, limit = 50, offset = 0 } = req.query;
    
    if (!fs.existsSync(RECORDINGS_DIR)) {
      return res.json({ data: [], total: 0 });
    }

    let files = [];
    
    // Função recursiva para buscar arquivos
    const walkDir = (dir, baseDir = '') => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(baseDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walkDir(fullPath, relativePath);
        } else if (['.wav', '.mp3', '.gsm'].includes(path.extname(item).toLowerCase())) {
          files.push({
            name: item,
            path: relativePath,
            size: stat.size,
            date: stat.mtime,
            duration: null // Será calculado pelo frontend se necessário
          });
        }
      });
    };

    walkDir(RECORDINGS_DIR);

    // Filtrar por data se especificado
    if (date) {
      const filterDate = new Date(date).toDateString();
      files = files.filter(f => new Date(f.date).toDateString() === filterDate);
    }

    // Filtrar por origem/destino (baseado no nome do arquivo)
    if (src) {
      files = files.filter(f => f.name.includes(src));
    }
    if (dst) {
      files = files.filter(f => f.name.includes(dst));
    }

    // Ordenar por data decrescente
    files.sort((a, b) => new Date(b.date) - new Date(a.date));

    const total = files.length;
    const data = files.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({ data, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/recordings/:filename - Stream recording file
router.get('/:filename(*)', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(RECORDINGS_DIR, filename);
    
    // Segurança: verificar se o caminho está dentro do diretório de gravações
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(RECORDINGS_DIR))) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    const stat = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    
    const mimeTypes = {
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.gsm': 'audio/gsm'
    };

    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Accept-Ranges', 'bytes');

    // Suporte a range requests para seeking
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      
      res.status(206);
      res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
      res.setHeader('Content-Length', chunksize);
      
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/recordings/:filename - Delete recording
router.delete('/:filename(*)', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(RECORDINGS_DIR, filename);
    
    // Segurança
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(RECORDINGS_DIR))) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    fs.unlinkSync(filePath);
    res.json({ success: 'Gravação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/recordings/stats - Get recording statistics
router.get('/stats/summary', async (req, res) => {
  try {
    if (!fs.existsSync(RECORDINGS_DIR)) {
      return res.json({ totalFiles: 0, totalSize: 0, oldestDate: null, newestDate: null });
    }

    let totalFiles = 0;
    let totalSize = 0;
    let oldestDate = null;
    let newestDate = null;

    const walkDir = (dir) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (['.wav', '.mp3', '.gsm'].includes(path.extname(item).toLowerCase())) {
          totalFiles++;
          totalSize += stat.size;
          
          if (!oldestDate || stat.mtime < oldestDate) oldestDate = stat.mtime;
          if (!newestDate || stat.mtime > newestDate) newestDate = stat.mtime;
        }
      });
    };

    walkDir(RECORDINGS_DIR);

    res.json({
      totalFiles,
      totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      oldestDate,
      newestDate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = router;
