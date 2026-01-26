#!/bin/bash

# Script de Instalação Automática - PABX Experip
# Execute: sudo bash install.sh

set -e

echo "=========================================="
echo "  INSTALAÇÃO AUTOMÁTICA - PABX EXPERIP"
echo "=========================================="

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO] $1${NC}"; }
warn() { echo -e "${YELLOW}[AVISO] $1${NC}"; }
error() { echo -e "${RED}[ERRO] $1${NC}"; exit 1; }

# Verificar root
if [ "$EUID" -ne 0 ]; then
    error "Execute como root ou com sudo"
fi

# Variáveis
INSTALL_DIR="/opt/pabx-experip-webui"
DB_NAME="pabx_db"
DB_USER="pabx_user"
DB_PASS="pabx123"

log "Iniciando instalação do PABX Experip..."

# 1. Atualizar sistema
log "Atualizando sistema..."
apt-get update
apt-get install -y curl wget git nginx postgresql postgresql-contrib

# 2. Instalar Node.js 18
log "Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 3. Clonar repositório
log "Clonando repositório..."
if [ -d "$INSTALL_DIR" ]; then
    warn "Diretório existe, fazendo backup..."
    mv $INSTALL_DIR ${INSTALL_DIR}.backup.$(date +%Y%m%d_%H%M%S)
fi

git clone https://github.com/rodrigo-palmatec/pabx-experip.git $INSTALL_DIR
cd $INSTALL_DIR

# 4. Configurar PostgreSQL
log "Configurando PostgreSQL..."
systemctl start postgresql
systemctl enable postgresql

# Criar banco e usuário
sudo -u postgres psql << EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\q
EOF

# 5. Instalar dependências do backend
log "Instalando dependências do backend..."
cd webui/server
npm install --production
npm install pg pg-hstore multer

# 6. Configurar banco PostgreSQL
log "Configurando banco de dados PostgreSQL..."
cat > database/index.js << EOF
const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '$DB_NAME',
  username: process.env.DB_USER || '$DB_USER',
  password: process.env.DB_PASSWORD || '$DB_PASS',
  logging: process.env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
  define: {
    timestamps: true,
    underscored: false
  }
});

module.exports = sequelize;
EOF

# 7. Build do frontend
log "Fazendo build do frontend..."
cd ../client
npm install
npm run build

# 8. Criar diretórios necessários
log "Criando diretórios..."
mkdir -p /var/spool/asterisk/monitor
chown -R asterisk:asterisk /var/spool/asterisk/monitor 2>/dev/null || true

# 9. Configurar Nginx
log "Configurando Nginx..."
cat > /etc/nginx/sites-available/pabx.experip.cloud << EOF
server {
    listen 80;
    server_name pabx.experip.cloud;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name pabx.experip.cloud;
    
    # Certificados SSL (precisa ser gerado com certbot)
    ssl_certificate /etc/letsencrypt/live/pabx.experip.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pabx.experip.cloud/privkey.pem;
    
    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Headers de segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Proxy para o backend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # WebSocket para Socket.IO
    location /socket.io/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }
}
EOF

# Ativar site nginx
ln -sf /etc/nginx/sites-available/pabx.experip.cloud /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Testar nginx
nginx -t

# 10. Criar serviço systemd
log "Configurando serviço systemd..."
cat > /etc/systemd/system/pabx-webui.service << EOF
[Unit]
Description=PABX Experip - Interface Web
Documentation=https://github.com/palmatec/pabx-experip
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=$INSTALL_DIR/webui/server
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# 11. Iniciar serviços
log "Iniciando serviços..."
systemctl daemon-reload
systemctl enable pabx-webui
systemctl start pabx-webui
systemctl restart nginx

# 12. Aguardar inicialização e criar usuário admin
log "Criando usuário administrador..."
sleep 5

# Criar usuário admin no banco
sudo -u postgres psql -d $DB_NAME << EOF
INSERT INTO users (username, password, name, administrator, superAdministrator, enabled, created_at, updated_at) 
VALUES ('admin', '\$2a\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrador', true, true, true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;
\q
EOF

# 13. Verificar status
log "Verificando instalação..."
sleep 3

if systemctl is-active --quiet pabx-webui; then
    log "✅ PABX WebUI está rodando"
else
    error "❌ Falha ao iniciar PABX WebUI"
fi

if systemctl is-active --quiet nginx; then
    log "✅ Nginx está rodando"
else
    error "❌ Falha ao iniciar Nginx"
fi

# 14. Informações finais
echo ""
echo "=========================================="
echo "  INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
echo "=========================================="
echo ""
echo "📡 Acesso ao sistema:"
echo "   URL: http://pabx.experip.cloud"
echo "   Usuário: admin"
echo "   Senha: admin123"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure o certificado SSL:"
echo "      sudo certbot --nginx -d pabx.experip.cloud"
echo ""
echo "   2. Configure o Asterisk AMI em /etc/asterisk/manager.conf"
echo ""
echo "   3. Verifique logs em tempo real:"
echo "      sudo journalctl -u pabx-webui -f"
echo ""
echo "📁 Diretórios importantes:"
echo "   Código: $INSTALL_DIR"
echo "   Logs: sudo journalctl -u pabx-webui"
echo "   Config Nginx: /etc/nginx/sites-available/pabx.experip.cloud"
echo ""
echo "🔄 Para atualizações futuras:"
echo "   cd $INSTALL_DIR && git pull && npm run build && systemctl restart pabx-webui"
echo ""
