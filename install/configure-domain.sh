#!/bin/bash
# Script para configurar domínio e SSL para PABX Experip
# Uso: sudo ./configure-domain.sh pabx.experip.cloud

set -e

DOMAIN=${1:-"pabx.experip.cloud"}
WEBUI_PORT=${2:-3000}
EMAIL=${3:-"admin@experip.cloud"}

echo "========================================"
echo "  PABX Experip - Configuração de Domínio"
echo "========================================"
echo "Domínio: $DOMAIN"
echo "Porta WebUI: $WEBUI_PORT"
echo ""

# Verificar se é root
if [ "$EUID" -ne 0 ]; then
  echo "Por favor, execute como root (sudo)"
  exit 1
fi

# Instalar certbot se não existir
if ! command -v certbot &> /dev/null; then
  echo "[1/5] Instalando Certbot..."
  apt-get update
  apt-get install -y certbot python3-certbot-nginx
else
  echo "[1/5] Certbot já instalado"
fi

# Criar configuração Nginx para o domínio
echo "[2/5] Configurando Nginx..."

cat > /etc/nginx/sites-available/pabx-experip << NGINX_CONF
# PABX Experip - $DOMAIN
server {
    listen 80;
    server_name $DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    # SSL será configurado pelo certbot
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Logs
    access_log /var/log/nginx/pabx-experip.access.log;
    error_log /var/log/nginx/pabx-experip.error.log;

    # Proxy para o backend Node.js
    location / {
        proxy_pass http://127.0.0.1:$WEBUI_PORT;
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
        proxy_pass http://127.0.0.1:$WEBUI_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }
}
NGINX_CONF

# Criar configuração temporária sem SSL para obter certificado
cat > /etc/nginx/sites-available/pabx-experip-temp << NGINX_TEMP
server {
    listen 80;
    server_name $DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        proxy_pass http://127.0.0.1:$WEBUI_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
NGINX_TEMP

# Ativar configuração temporária primeiro
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/pabx-experip
ln -sf /etc/nginx/sites-available/pabx-experip-temp /etc/nginx/sites-enabled/pabx-experip

# Testar e recarregar nginx
nginx -t
systemctl reload nginx

echo "[3/5] Obtendo certificado SSL..."

# Verificar se já existe certificado
if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  echo "Certificado já existe. Renovando..."
  certbot renew --nginx -d $DOMAIN
else
  # Obter certificado
  certbot certonly --webroot -w /var/www/html -d $DOMAIN --email $EMAIL --agree-tos --non-interactive
fi

echo "[4/5] Ativando configuração SSL..."

# Ativar configuração com SSL
rm -f /etc/nginx/sites-enabled/pabx-experip
ln -sf /etc/nginx/sites-available/pabx-experip /etc/nginx/sites-enabled/pabx-experip
rm -f /etc/nginx/sites-available/pabx-experip-temp

# Testar e recarregar nginx
nginx -t
systemctl reload nginx

echo "[5/5] Configurando renovação automática..."

# Adicionar job de renovação se não existir
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
  (crontab -l 2>/dev/null; echo "0 3 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
  echo "Cron job de renovação SSL adicionado"
fi

echo ""
echo "========================================"
echo "  Configuração Concluída!"
echo "========================================"
echo ""
echo "Seu PABX está disponível em:"
echo "  https://$DOMAIN"
echo ""
echo "Certificado SSL válido até:"
openssl x509 -enddate -noout -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem 2>/dev/null || echo "  (verificar manualmente)"
echo ""
echo "Para verificar o status:"
echo "  systemctl status nginx"
echo "  systemctl status pabx-webui"
echo ""
