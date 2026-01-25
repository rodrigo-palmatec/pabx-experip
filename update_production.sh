#!/bin/bash

# Script de Atualização do PABX Experip para Produção
# Execute: sudo bash update_production.sh

set -e  # Parar em caso de erro

echo "=========================================="
echo "  ATUALIZAÇÃO PABX EXPERIP - PRODUÇÃO"
echo "=========================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variáveis
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/pabx-backups"
PABX_DIR="/opt/pabx-experip-webui"
DB_NAME="pabx_db"
DB_USER="root"

# Função de log
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[AVISO] $1${NC}"
}

error() {
    echo -e "${RED}[ERRO] $1${NC}"
    exit 1
}

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    error "Execute este script como root ou com sudo"
fi

# Criar diretório de backup
log "Criando diretório de backup..."
mkdir -p $BACKUP_DIR

# 1. BACKUP COMPLETO
log "Iniciando backup completo do sistema..."

# Backup do banco de dados
log "Fazendo backup do banco de dados..."
# Tentar diferentes comandos de backup
if command -v mysqldump &> /dev/null; then
    mysqldump -u $DB_USER -p $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql || warn "Falha no backup do banco (continue sem backup)"
elif command -v mariadb-dump &> /dev/null; then
    mariadb-dump -u $DB_USER -p $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql || warn "Falha no backup do banco (continue sem backup)"
else
    warn "mysqldump não encontrado. Pulando backup do banco."
    warn "Instale com: apt-get install mysql-client ou mariadb-client"
fi

# Backup dos arquivos de configuração
log "Fazendo backup dos arquivos de configuração..."
tar -czf $BACKUP_DIR/asterisk_config_$DATE.tar.gz /etc/asterisk/ 2>/dev/null || warn "Diretório /etc/asterisk não encontrado"

# Backup das gravações existentes
if [ -d "/var/spool/asterisk/monitor" ]; then
    log "Fazendo backup das gravações existentes..."
    tar -czf $BACKUP_DIR/recordings_$DATE.tar.gz /var/spool/asterisk/monitor/ 2>/dev/null
fi

# Backup do código atual
if [ -d "$PABX_DIR" ]; then
    log "Fazendo backup do código atual..."
    tar -czf $BACKUP_DIR/code_backup_$DATE.tar.gz $PABX_DIR/ 2>/dev/null
fi

log "Backup concluído em $BACKUP_DIR"

# 2. PARAR SERVIÇOS
log "Parando serviços..."
systemctl stop asterisk 2>/dev/null || warn "Serviço asterisk não encontrado"
systemctl stop nginx 2>/dev/null || warn "Serviço nginx não encontrado"
systemctl stop pabx-webui 2>/dev/null || warn "Serviço pabx-webui não encontrado"

# 3. ATUALIZAR CÓDIGO
log "Atualizando código do repositório..."

if [ ! -d "$PABX_DIR" ]; then
    error "Diretório $PABX_DIR não encontrado. Verifique o caminho de instalação."
fi

cd $PABX_DIR

# Verificar se é um repositório git
if [ ! -d ".git" ]; then
    error "Diretório $PABX_DIR não é um repositório git"
fi

# Fazer pull das atualizações
log "Fazendo git pull..."
git pull origin master || error "Falha ao fazer git pull"

# 4. ATUALIZAR DEPENDÊNCIAS
log "Atualizando dependências do backend..."
cd webui/server
npm install || error "Falha ao instalar dependências do backend"

log "Atualizando dependências e build do frontend..."
cd ../client
npm install || error "Falha ao instalar dependências do frontend"
npm run build || error "Falha no build do frontend"

cd ../..

# 5. CONFIGURAR NOVOS RECURSOS
log "Configurando novos recursos..."

# Criar diretório de gravações
mkdir -p /var/spool/asterisk/monitor
chown -R asterisk:asterisk /var/spool/asterisk/monitor 2>/dev/null || warn "Não foi possível ajustar permissões do asterisk"

# Verificar se o banco precisa de atualizações
log "Verificando estrutura do banco de dados..."
if command -v mysql &> /dev/null; then
    mysql -u $DB_USER -p $DB_NAME -e "
        -- Verificar se as novas tabelas existem
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = '$DB_NAME' 
        AND table_name IN ('customRules', 'recordings');
    " 2>/dev/null || warn "Não foi possível verificar as tabelas do banco"
else
    warn "mysql não encontrado. Pulando verificação do banco."
fi

# 6. REINICIAR SERVIÇOS
log "Reiniciando serviços..."

# Reiniciar asterisk
systemctl start asterisk || warn "Falha ao iniciar asterisk"
sleep 2

# Reiniciar nginx
systemctl start nginx || warn "Falha ao iniciar nginx"

# Reiniciar webui
systemctl start pabx-webui || warn "Falha ao iniciar pabx-webui"

# 7. VERIFICAÇÃO
log "Verificando status dos serviços..."

echo ""
echo "=========================================="
echo "  STATUS DOS SERVIÇOS"
echo "=========================================="

systemctl is-active asterisk || echo "Asterisk: INATIVO"
systemctl is-active nginx || echo "Nginx: INATIVO"  
systemctl is-active pabx-webui || echo "PABX WebUI: INATIVO"

# Verificar portas
echo ""
echo "Verificando portas..."
netstat -tlnp | grep -E ':(3000|5060|8080|80|443)' || warn "Algumas portas podem não estar ativas"

# 8. LIMPEZA
log "Limpando arquivos temporários..."
npm cache clean --force 2>/dev/null || true

# 9. RESUMO
echo ""
echo "=========================================="
echo "  ATUALIZAÇÃO CONCLUÍDA COM SUCESSO!"
echo "=========================================="
echo ""
echo "Backup salvo em: $BACKUP_DIR"
echo "Data/Hora: $(date)"
echo ""
echo "Próximos passos:"
echo "1. Acesse: http://seu-servidor:3000"
echo "2. Teste as novas funcionalidades:"
echo "   - Dashboard com estatísticas"
echo "   - Blacklist com import/export"
echo "   - Gravações de chamadas"
echo "   - Regras customizadas"
echo "   - Horários de atendimento"
echo ""
echo "Para verificar logs:"
echo "  sudo journalctl -u pabx-webui -f"
echo "  sudo tail -f /var/log/asterisk/full"
echo ""
echo "Para restaurar backup (se necessário):"
echo "  mysql -u root -p pabx_db < $BACKUP_DIR/db_backup_$DATE.sql"
echo ""

# Verificação final
if systemctl is-active --quiet pabx-webui; then
    log "✅ PABX WebUI está rodando"
else
    warn "⚠️  PABX WebUI pode não estar rodando corretamente"
fi

echo ""
log "Script concluído! Verifique manualmente se tudo está funcionando."
