#!/bin/bash
#
# Script de Instalação da Interface Web do PABX Experip
# Palmatec - Sistema de Telefonia IP
#
# Uso: sudo ./install-webui.sh
#

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

WEBUI_DIR="/opt/pabx-experip-webui"
WEBUI_USER="pabx-webui"
WEBUI_PORT=3000

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

show_banner() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║     PABX EXPERIP - Interface Web                              ║"
    echo "║     Instalador                                                ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

check_root() {
    if [ "$EUID" -ne 0 ]; then
        log_error "Este script precisa ser executado como root (sudo)"
        exit 1
    fi
}

check_node() {
    if ! command -v node &> /dev/null; then
        log_error "Node.js não está instalado. Execute primeiro: install-debian11.sh"
        exit 1
    fi
    log_info "Node.js $(node -v) detectado"
}

create_webui_user() {
    log_step "Criando usuário para interface web..."
    
    if ! id "$WEBUI_USER" &>/dev/null; then
        useradd -r -d "$WEBUI_DIR" -s /sbin/nologin $WEBUI_USER
        log_info "Usuário $WEBUI_USER criado"
    else
        log_info "Usuário $WEBUI_USER já existe"
    fi
}

copy_webui_files() {
    log_step "Copiando arquivos da interface web..."
    
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    SOURCE_WEBUI="$SCRIPT_DIR/../webui"
    
    mkdir -p "$WEBUI_DIR"
    
    if [ -d "$SOURCE_WEBUI" ]; then
        cp -r "$SOURCE_WEBUI"/* "$WEBUI_DIR/"
        log_info "Arquivos copiados para $WEBUI_DIR"
    else
        log_error "Diretório da interface web não encontrado: $SOURCE_WEBUI"
        exit 1
    fi
}

install_dependencies() {
    log_step "Instalando dependências Node.js..."
    
    cd "$WEBUI_DIR"
    npm install --production
    
    log_info "Dependências instaladas"
}

create_env_file() {
    log_step "Configurando variáveis de ambiente..."
    
    # Carregar credenciais do AMI
    if [ -f /etc/pabx-experip/ami.conf ]; then
        source /etc/pabx-experip/ami.conf
    else
        log_warn "Arquivo de credenciais AMI não encontrado"
        AMI_HOST="127.0.0.1"
        AMI_PORT="5038"
        AMI_USER="admin"
        AMI_SECRET="changeme"
        ARI_HOST="127.0.0.1"
        ARI_PORT="8088"
        ARI_USER="admin"
        ARI_PASSWORD="changeme"
    fi
    
    # Gerar chave JWT
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Gerar senha admin padrão
    ADMIN_PASSWORD=$(openssl rand -base64 12 | tr -dc 'a-zA-Z0-9' | head -c 12)
    
    cat > "$WEBUI_DIR/.env" << EOF
# Configuração do servidor
NODE_ENV=production
PORT=$WEBUI_PORT
HOST=127.0.0.1

# Credenciais AMI
AMI_HOST=$AMI_HOST
AMI_PORT=$AMI_PORT
AMI_USER=$AMI_USER
AMI_SECRET=$AMI_SECRET

# Credenciais ARI
ARI_HOST=$ARI_HOST
ARI_PORT=$ARI_PORT
ARI_USER=$ARI_USER
ARI_PASSWORD=$ARI_PASSWORD

# JWT
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=24h

# Admin padrão
ADMIN_USER=admin
ADMIN_PASSWORD=$ADMIN_PASSWORD
EOF

    chmod 600 "$WEBUI_DIR/.env"
    chown $WEBUI_USER:$WEBUI_USER "$WEBUI_DIR/.env"
    
    # Salvar credenciais em local seguro
    cat > /etc/pabx-experip/webui.conf << EOF
WEBUI_URL=http://localhost:$WEBUI_PORT
ADMIN_USER=admin
ADMIN_PASSWORD=$ADMIN_PASSWORD
EOF
    chmod 600 /etc/pabx-experip/webui.conf
    
    log_info "Variáveis de ambiente configuradas"
}

configure_permissions() {
    log_step "Configurando permissões..."
    
    chown -R $WEBUI_USER:$WEBUI_USER "$WEBUI_DIR"
    chmod 750 "$WEBUI_DIR"
    
    # Criar diretório de logs
    mkdir -p /var/log/pabx-webui
    chown $WEBUI_USER:$WEBUI_USER /var/log/pabx-webui
    chmod 750 /var/log/pabx-webui
    
    # Adicionar usuário webui ao grupo asterisk para leitura de configs
    usermod -a -G asterisk $WEBUI_USER 2>/dev/null || true
    
    log_info "Permissões configuradas"
}

configure_systemd() {
    log_step "Configurando serviço systemd..."
    
    cat > /etc/systemd/system/pabx-webui.service << EOF
[Unit]
Description=PABX Experip - Interface Web
Documentation=https://github.com/palmatec/pabx-experip
After=network.target asterisk.service
Requires=asterisk.service

[Service]
Type=simple
User=$WEBUI_USER
Group=$WEBUI_USER
WorkingDirectory=$WEBUI_DIR
ExecStart=/usr/bin/node $WEBUI_DIR/server/index.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=pabx-webui

# Ambiente
Environment=NODE_ENV=production

# Segurança
PrivateTmp=true
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable pabx-webui
    
    log_info "Serviço systemd configurado"
}

configure_nginx() {
    log_step "Configurando Nginx como proxy reverso..."
    
    cat > /etc/nginx/sites-available/pabx-experip << EOF
server {
    listen 80;
    server_name _;
    
    # Redirecionar para HTTPS (descomente se tiver SSL)
    # return 301 https://\$host\$request_uri;
    
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
    
    # WebSocket para eventos em tempo real
    location /socket.io/ {
        proxy_pass http://127.0.0.1:$WEBUI_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

    # Ativar site
    ln -sf /etc/nginx/sites-available/pabx-experip /etc/nginx/sites-enabled/
    
    # Remover site default
    rm -f /etc/nginx/sites-enabled/default
    
    # Testar configuração
    nginx -t
    
    # Reiniciar nginx
    systemctl restart nginx
    systemctl enable nginx
    
    log_info "Nginx configurado"
}

start_services() {
    log_step "Iniciando serviços..."
    
    systemctl start pabx-webui
    sleep 3
    
    if systemctl is-active --quiet pabx-webui; then
        log_info "Interface Web iniciada com sucesso"
    else
        log_error "Falha ao iniciar a interface web"
        journalctl -u pabx-webui --no-pager -n 20
        exit 1
    fi
}

show_final_info() {
    # Obter IP do servidor
    SERVER_IP=$(hostname -I | awk '{print $1}')
    
    # Ler credenciais
    source /etc/pabx-experip/webui.conf
    
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║      INTERFACE WEB INSTALADA COM SUCESSO!                     ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Acesso à Interface Web:${NC}"
    echo "  - URL: http://$SERVER_IP"
    echo "  - Usuário: admin"
    echo "  - Senha: $ADMIN_PASSWORD"
    echo ""
    echo -e "${BLUE}Comandos úteis:${NC}"
    echo "  - Status Interface:    systemctl status pabx-webui"
    echo "  - Logs Interface:      journalctl -u pabx-webui -f"
    echo "  - Reiniciar:           systemctl restart pabx-webui"
    echo ""
    echo -e "${YELLOW}IMPORTANTE:${NC}"
    echo "  - Altere a senha padrão após o primeiro acesso!"
    echo "  - Credenciais salvas em: /etc/pabx-experip/webui.conf"
    echo ""
}

main() {
    show_banner
    
    check_root
    check_node
    create_webui_user
    copy_webui_files
    install_dependencies
    create_env_file
    configure_permissions
    configure_systemd
    configure_nginx
    start_services
    
    show_final_info
}

main "$@"
