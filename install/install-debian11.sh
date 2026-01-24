#!/bin/bash
#
# Script de Instalação do PABX Experip (Fork Asterisk) para Debian 11
# Palmatec - Sistema de Telefonia IP
#
# Uso: sudo ./install-debian11.sh
#

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variáveis de configuração
ASTERISK_USER="asterisk"
ASTERISK_GROUP="asterisk"
INSTALL_DIR="/usr/src/pabx-experip"
CONFIG_DIR="/etc/asterisk"
LOG_DIR="/var/log/asterisk"
SPOOL_DIR="/var/spool/asterisk"
RUN_DIR="/var/run/asterisk"
LIB_DIR="/var/lib/asterisk"

# Função para exibir banner
show_banner() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║     PABX EXPERIP - Sistema de Telefonia IP                    ║"
    echo "║     Instalador para Debian 11 (Bullseye)                      ║"
    echo "║     Palmatec                                                  ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Função para logging
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Verificar se está rodando como root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        log_error "Este script precisa ser executado como root (sudo)"
        exit 1
    fi
}

# Verificar se é Debian 11
check_debian() {
    if [ ! -f /etc/debian_version ]; then
        log_error "Este script é apenas para Debian"
        exit 1
    fi
    
    VERSION=$(cat /etc/debian_version)
    if [[ ! "$VERSION" =~ ^11 ]]; then
        log_warn "Este script foi desenvolvido para Debian 11. Versão detectada: $VERSION"
        read -p "Deseja continuar mesmo assim? (s/N): " choice
        if [[ ! "$choice" =~ ^[Ss]$ ]]; then
            exit 1
        fi
    fi
    log_info "Sistema Debian 11 detectado: $VERSION"
}

# Atualizar sistema
update_system() {
    log_step "Atualizando sistema..."
    apt-get update -y
    apt-get upgrade -y
    log_info "Sistema atualizado com sucesso"
}

# Instalar dependências
install_dependencies() {
    log_step "Instalando dependências de compilação..."
    
    # Dependências básicas de build
    apt-get install -y \
        build-essential \
        pkg-config \
        autoconf \
        autoconf-archive \
        automake \
        libtool \
        git \
        wget \
        curl \
        vim \
        nano \
        htop \
        sudo

    log_step "Instalando dependências do Asterisk..."
    
    # Dependências principais do Asterisk
    apt-get install -y \
        libedit-dev \
        libjansson-dev \
        libsqlite3-dev \
        uuid-dev \
        libxml2-dev \
        libncurses5-dev \
        libssl-dev \
        libspeex-dev \
        libspeexdsp-dev \
        libogg-dev \
        libvorbis-dev \
        libasound2-dev \
        portaudio19-dev \
        libcurl4-openssl-dev \
        xmlstarlet \
        bison \
        flex \
        libpq-dev \
        unixodbc-dev \
        libneon27-dev \
        libgmime-3.0-dev \
        liblua5.2-dev \
        liburiparser-dev \
        libxslt1-dev \
        libmariadb-dev \
        libbluetooth-dev \
        libradcli-dev \
        freetds-dev \
        libjack-jackd2-dev \
        bash \
        libcap-dev \
        libsnmp-dev \
        libiksemel-dev \
        libnewt-dev \
        libpopt-dev \
        libical-dev \
        libspandsp-dev \
        libresample1-dev \
        libc-client2007e-dev \
        binutils-dev \
        libsrtp2-dev \
        libgsm1-dev \
        doxygen \
        graphviz \
        zlib1g-dev \
        libldap2-dev \
        libcodec2-dev \
        libfftw3-dev \
        libsndfile1-dev \
        libunbound-dev \
        bzip2 \
        patch \
        subversion
    
    log_info "Dependências instaladas com sucesso"
}

# Instalar dependências para interface web
install_web_dependencies() {
    log_step "Instalando Node.js para interface web..."
    
    # Instalar Node.js 18.x LTS
    if ! command -v node &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi
    
    # Instalar nginx para proxy reverso
    apt-get install -y nginx
    
    log_info "Node.js $(node -v) instalado"
    log_info "NPM $(npm -v) instalado"
    log_info "Nginx instalado"
}

# Criar usuário asterisk
create_asterisk_user() {
    log_step "Criando usuário asterisk..."
    
    if ! id "$ASTERISK_USER" &>/dev/null; then
        # Criar grupo se não existir
        if ! getent group "$ASTERISK_GROUP" &>/dev/null; then
            groupadd -r "$ASTERISK_GROUP"
        fi
        # Criar usuário
        useradd -r -g "$ASTERISK_GROUP" -d /var/lib/asterisk -s /sbin/nologin "$ASTERISK_USER"
        log_info "Usuário $ASTERISK_USER criado"
    else
        log_info "Usuário $ASTERISK_USER já existe"
    fi
}

# Copiar fonte do Asterisk
copy_source() {
    log_step "Verificando código fonte do PABX Experip..."
    
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    SOURCE_DIR="$(dirname "$SCRIPT_DIR")"
    
    # Se já estamos no diretório de instalação, não precisa copiar
    if [ "$SOURCE_DIR" = "$INSTALL_DIR" ]; then
        log_info "Código fonte já está em $INSTALL_DIR"
        return 0
    fi
    
    mkdir -p "$INSTALL_DIR"
    
    # Copiar arquivos do repositório
    if [ -d "$SOURCE_DIR/.git" ]; then
        log_info "Copiando de $SOURCE_DIR para $INSTALL_DIR..."
        cp -r "$SOURCE_DIR"/* "$INSTALL_DIR/"
        log_info "Código fonte copiado para $INSTALL_DIR"
    else
        log_error "Diretório fonte não encontrado: $SOURCE_DIR"
        exit 1
    fi
}

# Compilar Asterisk
compile_asterisk() {
    log_step "Compilando PABX Experip (Asterisk)..."
    
    cd "$INSTALL_DIR"
    
    # Executar bootstrap se necessário
    if [ ! -f configure ] || [ bootstrap.sh -nt configure ]; then
        log_info "Executando bootstrap..."
        ./bootstrap.sh
    fi
    
    # Configurar
    log_info "Executando ./configure..."
    ./configure \
        --with-pjproject-bundled \
        --with-jansson-bundled \
        --with-crypto \
        --with-ssl \
        --with-srtp
    
    # Compilar
    log_info "Compilando (isso pode demorar alguns minutos)..."
    make -j$(nproc)
    
    log_info "Compilação concluída com sucesso"
}

# Instalar Asterisk
install_asterisk() {
    log_step "Instalando PABX Experip..."
    
    cd "$INSTALL_DIR"
    
    make install
    
    # Instalar configurações de exemplo se não existirem
    if [ ! -f "$CONFIG_DIR/asterisk.conf" ]; then
        log_info "Instalando configurações de exemplo..."
        make samples
    fi
    
    # Instalar cabeçalhos de desenvolvimento
    make install-headers
    
    # Instalar documentação
    make progdocs || true
    
    log_info "PABX Experip instalado com sucesso"
}

# Configurar permissões
configure_permissions() {
    log_step "Configurando permissões..."
    
    # Criar diretórios necessários
    mkdir -p "$CONFIG_DIR"
    mkdir -p "$LOG_DIR"
    mkdir -p "$SPOOL_DIR"
    mkdir -p "$RUN_DIR"
    mkdir -p "$LIB_DIR"
    mkdir -p "$LIB_DIR/sounds"
    mkdir -p "$LIB_DIR/moh"
    mkdir -p "$SPOOL_DIR/voicemail"
    mkdir -p "$SPOOL_DIR/monitor"
    
    # Configurar proprietário
    chown -R $ASTERISK_USER:$ASTERISK_GROUP "$CONFIG_DIR"
    chown -R $ASTERISK_USER:$ASTERISK_GROUP "$LOG_DIR"
    chown -R $ASTERISK_USER:$ASTERISK_GROUP "$SPOOL_DIR"
    chown -R $ASTERISK_USER:$ASTERISK_GROUP "$RUN_DIR"
    chown -R $ASTERISK_USER:$ASTERISK_GROUP "$LIB_DIR"
    
    # Permissões
    chmod 750 "$CONFIG_DIR"
    chmod 750 "$LOG_DIR"
    chmod 750 "$SPOOL_DIR"
    chmod 755 "$RUN_DIR"
    
    log_info "Permissões configuradas"
}

# Configurar systemd
configure_systemd() {
    log_step "Configurando serviço systemd..."
    
    cat > /etc/systemd/system/asterisk.service << 'EOF'
[Unit]
Description=PABX Experip - Asterisk PBX
Documentation=https://www.asterisk.org/
After=network.target

[Service]
Type=simple
User=asterisk
Group=asterisk
Environment="HOME=/var/lib/asterisk"
WorkingDirectory=/var/lib/asterisk
ExecStart=/usr/sbin/asterisk -f -U asterisk -G asterisk -vvvg -c
ExecReload=/usr/sbin/asterisk -rx 'core reload'
ExecStop=/usr/sbin/asterisk -rx 'core stop gracefully'
Restart=on-failure
RestartSec=5

# Segurança
PrivateTmp=true
ProtectSystem=full
NoNewPrivileges=false

# Limites
LimitCORE=infinity
LimitNOFILE=65536
LimitNPROC=65536

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable asterisk
    
    log_info "Serviço systemd configurado"
}

# Configurar logrotate
configure_logrotate() {
    log_step "Configurando logrotate..."
    
    cat > /etc/logrotate.d/asterisk << 'EOF'
/var/log/asterisk/messages
/var/log/asterisk/queue_log
/var/log/asterisk/cdr-csv/Master.csv
/var/log/asterisk/cdr-custom/Master.csv
/var/log/asterisk/debug
/var/log/asterisk/full
/var/log/asterisk/console
{
    weekly
    missingok
    rotate 4
    compress
    delaycompress
    notifempty
    create 0640 asterisk asterisk
    sharedscripts
    postrotate
        /usr/sbin/asterisk -rx 'logger reload' > /dev/null 2>&1 || true
    endscript
}
EOF

    log_info "Logrotate configurado"
}

# Configurar AMI (Asterisk Manager Interface)
configure_ami() {
    log_step "Configurando AMI (Asterisk Manager Interface)..."
    
    # Gerar senha aleatória para o admin
    AMI_SECRET=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 16)
    
    cat > "$CONFIG_DIR/manager.conf" << EOF
[general]
enabled = yes
port = 5038
bindaddr = 127.0.0.1
displayconnects = yes
timestampevents = yes

[admin]
secret = $AMI_SECRET
deny = 0.0.0.0/0.0.0.0
permit = 127.0.0.1/255.255.255.255
read = all
write = all
writetimeout = 5000
EOF

    chown $ASTERISK_USER:$ASTERISK_GROUP "$CONFIG_DIR/manager.conf"
    chmod 640 "$CONFIG_DIR/manager.conf"
    
    # Salvar credenciais para a interface web
    mkdir -p /etc/pabx-experip
    cat > /etc/pabx-experip/ami.conf << EOF
AMI_HOST=127.0.0.1
AMI_PORT=5038
AMI_USER=admin
AMI_SECRET=$AMI_SECRET
EOF
    chmod 600 /etc/pabx-experip/ami.conf
    
    log_info "AMI configurado. Credenciais salvas em /etc/pabx-experip/ami.conf"
}

# Configurar HTTP para ARI
configure_http() {
    log_step "Configurando HTTP/ARI..."
    
    cat > "$CONFIG_DIR/http.conf" << 'EOF'
[general]
enabled = yes
bindaddr = 127.0.0.1
bindport = 8088
prefix = asterisk
enablestatic = yes
EOF

    ARI_PASSWORD=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 16)
    
    cat > "$CONFIG_DIR/ari.conf" << EOF
[general]
enabled = yes
pretty = yes
allowed_origins = *

[admin]
type = user
read_only = no
password = $ARI_PASSWORD
EOF

    chown $ASTERISK_USER:$ASTERISK_GROUP "$CONFIG_DIR/http.conf"
    chown $ASTERISK_USER:$ASTERISK_GROUP "$CONFIG_DIR/ari.conf"
    chmod 640 "$CONFIG_DIR/http.conf"
    chmod 640 "$CONFIG_DIR/ari.conf"
    
    # Salvar credenciais ARI
    cat >> /etc/pabx-experip/ami.conf << EOF
ARI_HOST=127.0.0.1
ARI_PORT=8088
ARI_USER=admin
ARI_PASSWORD=$ARI_PASSWORD
EOF
    
    log_info "HTTP/ARI configurado"
}

# Configurar firewall básico
configure_firewall() {
    log_step "Configurando firewall (UFW)..."
    
    if command -v ufw &> /dev/null; then
        ufw allow 22/tcp comment 'SSH'
        ufw allow 80/tcp comment 'HTTP'
        ufw allow 443/tcp comment 'HTTPS'
        ufw allow 5060/udp comment 'SIP UDP'
        ufw allow 5060/tcp comment 'SIP TCP'
        ufw allow 5061/tcp comment 'SIP TLS'
        ufw allow 10000:20000/udp comment 'RTP Media'
        
        log_info "Regras de firewall configuradas"
    else
        log_warn "UFW não instalado. Configure o firewall manualmente."
    fi
}

# Criar configuração básica de PJSIP
create_basic_config() {
    log_step "Criando configuração básica de PJSIP..."
    
    cat > "$CONFIG_DIR/pjsip.conf" << 'EOF'
; Configuração PJSIP para PABX Experip
; Gerado automaticamente pelo instalador

[global]
max_forwards = 70
user_agent = PABX-Experip/1.0
default_outbound_endpoint = default

[transport-udp]
type = transport
protocol = udp
bind = 0.0.0.0:5060

[transport-tcp]
type = transport
protocol = tcp
bind = 0.0.0.0:5060

; Template para endpoints
[endpoint-template](!)
type = endpoint
context = internal
transport = transport-udp
disallow = all
allow = ulaw
allow = alaw
allow = g722
direct_media = no
trust_id_inbound = yes
device_state_busy_at = 1
dtmf_mode = rfc4733
rtp_symmetric = yes
force_rport = yes
rewrite_contact = yes

; Template para autenticação
[auth-template](!)
type = auth
auth_type = userpass

; Template para AOR
[aor-template](!)
type = aor
max_contacts = 1
remove_existing = yes

; Ramal de exemplo 1001
;[1001](endpoint-template)
;auth = 1001-auth
;aors = 1001
;callerid = "Ramal 1001" <1001>
;
;[1001-auth](auth-template)
;username = 1001
;password = senha1001
;
;[1001](aor-template)
EOF

    chown $ASTERISK_USER:$ASTERISK_GROUP "$CONFIG_DIR/pjsip.conf"
    chmod 640 "$CONFIG_DIR/pjsip.conf"
    
    log_info "Configuração PJSIP básica criada"
}

# Criar dialplan básico
create_dialplan() {
    log_step "Criando dialplan básico..."
    
    cat > "$CONFIG_DIR/extensions.conf" << 'EOF'
; Dialplan PABX Experip
; Gerado automaticamente pelo instalador

[general]
static = yes
writeprotect = no
clearglobalvars = no

[globals]

[default]
; Contexto padrão - bloqueia tudo
exten => _X.,1,NoOp(Chamada não autorizada: ${EXTEN})
 same => n,Hangup(CALL_REJECTED)

[internal]
; Contexto para ramais internos

; Chamadas entre ramais (1000-1999)
exten => _1XXX,1,NoOp(Chamada interna para ${EXTEN})
 same => n,Dial(PJSIP/${EXTEN},30,tT)
 same => n,Hangup()

; Voicemail
exten => *98,1,NoOp(Acesso ao Voicemail)
 same => n,VoiceMailMain(${CALLERID(num)}@default,s)
 same => n,Hangup()

; Echo test
exten => *43,1,NoOp(Teste de eco)
 same => n,Answer()
 same => n,Echo()
 same => n,Hangup()

; Hora atual
exten => *60,1,NoOp(Hora atual)
 same => n,Answer()
 same => n,SayUnixTime(,,ABdY 'digits/at' IMp)
 same => n,Hangup()

; Hangup
exten => h,1,Hangup()

[outbound]
; Contexto para chamadas de saída
; Configure seus troncos aqui

exten => _0XXXXXXXXXX,1,NoOp(Chamada local: ${EXTEN})
 same => n,Dial(PJSIP/${EXTEN}@trunk-saida,60,tT)
 same => n,Hangup()

exten => _00XX.,1,NoOp(Chamada internacional: ${EXTEN})
 same => n,Dial(PJSIP/${EXTEN}@trunk-saida,120,tT)
 same => n,Hangup()
EOF

    chown $ASTERISK_USER:$ASTERISK_GROUP "$CONFIG_DIR/extensions.conf"
    chmod 640 "$CONFIG_DIR/extensions.conf"
    
    log_info "Dialplan básico criado"
}

# Iniciar serviço
start_service() {
    log_step "Iniciando serviço Asterisk..."
    
    systemctl start asterisk
    sleep 3
    
    if systemctl is-active --quiet asterisk; then
        log_info "Serviço Asterisk iniciado com sucesso"
    else
        log_error "Falha ao iniciar o serviço Asterisk"
        journalctl -u asterisk --no-pager -n 20
        exit 1
    fi
}

# Exibir informações finais
show_final_info() {
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║           INSTALAÇÃO CONCLUÍDA COM SUCESSO!                   ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Informações do Sistema:${NC}"
    echo "  - Diretório de configuração: $CONFIG_DIR"
    echo "  - Diretório de logs: $LOG_DIR"
    echo "  - Usuário do serviço: $ASTERISK_USER"
    echo ""
    echo -e "${BLUE}Comandos úteis:${NC}"
    echo "  - Iniciar Asterisk:    systemctl start asterisk"
    echo "  - Parar Asterisk:      systemctl stop asterisk"
    echo "  - Reiniciar Asterisk:  systemctl restart asterisk"
    echo "  - Status:              systemctl status asterisk"
    echo "  - Console CLI:         asterisk -rvvv"
    echo ""
    echo -e "${BLUE}Credenciais AMI/ARI:${NC}"
    echo "  - Salvas em: /etc/pabx-experip/ami.conf"
    echo ""
    echo -e "${YELLOW}Próximo passo:${NC}"
    echo "  Execute o script de instalação da interface web:"
    echo "  sudo ./install-webui.sh"
    echo ""
}

# Função principal
main() {
    show_banner
    
    log_info "Iniciando instalação do PABX Experip..."
    echo ""
    
    check_root
    check_debian
    update_system
    install_dependencies
    install_web_dependencies
    create_asterisk_user
    copy_source
    compile_asterisk
    install_asterisk
    configure_permissions
    configure_systemd
    configure_logrotate
    configure_ami
    configure_http
    configure_firewall
    create_basic_config
    create_dialplan
    start_service
    
    show_final_info
}

# Executar
main "$@"
