const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MusicOnHold } = require('../models');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// Configuração do multer para upload de áudios
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mohDir = req.body.directory || '/var/lib/asterisk/moh/default';
    if (!fs.existsSync(mohDir)) {
      fs.mkdirSync(mohDir, { recursive: true });
    }
    cb(null, mohDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${name}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.wav', '.mp3', '.gsm', '.ulaw', '.alaw'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo não suportado. Use: WAV, MP3, GSM'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
});

// GET /api/moh - List all music on hold classes
router.get('/', async (req, res) => {
  try {
    const mohClasses = await MusicOnHold.findAll({
      order: [['name', 'ASC']]
    });
    res.json(mohClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/moh/:id - Get MOH class by ID
router.get('/:id', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }
    res.json(moh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/moh - Create MOH class
router.post('/', async (req, res) => {
  try {
    const { name, directory } = req.body;
    if (!name || !directory) {
      return res.status(400).json({ error: 'Name and directory are required' });
    }

    const moh = await MusicOnHold.create({
      ...req.body,
      createdBy: req.user?.username || 'admin'
    });

    res.status(201).json(moh);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'MOH class name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/moh/:id - Update MOH class
router.put('/:id', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }

    await moh.update({
      ...req.body,
      updatedBy: req.user?.username || 'admin'
    });

    res.json(moh);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({ error: 'MOH class name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/moh/:id - Delete MOH class
router.delete('/:id', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }
    
    if (moh.name === 'default') {
      return res.status(422).json({ error: 'Cannot delete default MOH class' });
    }
    
    await moh.destroy();
    res.json({ success: 'Music on hold class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/moh/:id/files - List audio files in MOH directory
router.get('/:id/files', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }

    const directory = moh.directory;
    if (!fs.existsSync(directory)) {
      return res.json([]);
    }

    const files = fs.readdirSync(directory)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.wav', '.mp3', '.gsm', '.ulaw', '.alaw'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          modified: stats.mtime
        };
      });

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/moh/:id/upload - Upload audio file to MOH directory
router.post('/:id/upload', upload.single('audio'), async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Mover arquivo para o diretório correto se necessário
    const targetDir = moh.directory;
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, req.file.filename);
    if (req.file.path !== targetPath) {
      fs.renameSync(req.file.path, targetPath);
    }

    res.json({ 
      success: true, 
      file: {
        name: req.file.filename,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/moh/:id/files/:filename - Delete audio file from MOH directory
router.delete('/:id/files/:filename', async (req, res) => {
  try {
    const moh = await MusicOnHold.findByPk(req.params.id);
    if (!moh) {
      return res.status(404).json({ error: 'Music on hold class not found' });
    }

    const filePath = path.join(moh.directory, req.params.filename);
    
    // Verificar se o arquivo está dentro do diretório MOH (segurança)
    if (!filePath.startsWith(moh.directory)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    fs.unlinkSync(filePath);
    res.json({ success: 'Arquivo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
