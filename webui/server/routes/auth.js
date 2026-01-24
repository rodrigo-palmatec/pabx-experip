const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken, authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Usuários em memória (em produção, usar banco de dados)
const users = new Map();

// Inicializar usuário admin
const initAdmin = () => {
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = bcrypt.hashSync(adminPass, 10);
  users.set(adminUser, { username: adminUser, password: hash, role: 'admin' });
};
initAdmin();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    const user = users.get(username);
    if (!user) {
      logger.warn(`Tentativa de login com usuário inexistente: ${username}`);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      logger.warn(`Senha incorreta para usuário: ${username}`);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken(user);
    logger.info(`Login bem-sucedido: ${username}`);

    res.json({
      token,
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    logger.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/auth/change-password
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const username = req.user.username;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Senhas são obrigatórias' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Nova senha deve ter pelo menos 6 caracteres' });
    }

    const user = users.get(username);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    users.set(username, user);

    logger.info(`Senha alterada para usuário: ${username}`);
    res.json({ message: 'Senha alterada com sucesso' });
  } catch (err) {
    logger.error('Erro ao alterar senha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    username: req.user.username,
    role: req.user.role
  });
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, (req, res) => {
  logger.info(`Logout: ${req.user.username}`);
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
