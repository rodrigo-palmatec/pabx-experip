#!/bin/bash
#
# Script de Atualização do PABX Experip WebUI
# Execute como root: sudo bash update-webui.sh
#

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configurações
INSTALL_DIR="/opt/pabx-experip"
WEBUI_DIR="$INSTALL_DIR/webui"
SERVICE_NAME="pabx-webui"
BACKUP_DIR="/opt/pabx-backup"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  PABX Experip - Atualização do Sistema ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Verificar se está rodando como root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Este script deve ser executado como root${NC}"
   exit 1
fi

# Verificar se o diretório existe
if [ ! -d "$WEBUI_DIR" ]; then
    echo -e "${RED}Diretório $WEBUI_DIR não encontrado!${NC}"
    echo "Verifique se o PABX Experip está instalado corretamente."
    exit 1
fi

# Criar backup do banco de dados
echo -e "${YELLOW}[1/6] Criando backup do banco de dados...${NC}"
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/pabx-backup-$(date +%Y%m%d_%H%M%S).sqlite"
if [ -f "$WEBUI_DIR/server/data/pabx.sqlite" ]; then
    cp "$WEBUI_DIR/server/data/pabx.sqlite" "$BACKUP_FILE"
    echo -e "${GREEN}Backup salvo em: $BACKUP_FILE${NC}"
else
    echo -e "${YELLOW}Banco de dados não encontrado (primeira instalação?)${NC}"
fi

# Parar o serviço
echo -e "${YELLOW}[2/6] Parando serviço $SERVICE_NAME...${NC}"
if systemctl is-active --quiet $SERVICE_NAME; then
    systemctl stop $SERVICE_NAME
    echo -e "${GREEN}Serviço parado${NC}"
else
    echo -e "${YELLOW}Serviço não estava rodando${NC}"
fi

# Atualizar código
echo -e "${YELLOW}[3/6] Atualizando código fonte...${NC}"
cd "$INSTALL_DIR"

# Verificar se é um repositório git
if [ -d ".git" ]; then
    # Guardar alterações locais se houver
    git stash --include-untracked 2>/dev/null || true
    
    # Buscar atualizações
    git fetch origin
    
    # Atualizar para a branch principal
    git checkout master 2>/dev/null || git checkout main 2>/dev/null
    git pull origin master 2>/dev/null || git pull origin main 2>/dev/null
    
    echo -e "${GREEN}Código atualizado${NC}"
else
    echo -e "${RED}Diretório não é um repositório Git!${NC}"
    echo "Para atualizar manualmente, copie os novos arquivos para $INSTALL_DIR"
    exit 1
fi

# Instalar dependências do backend
echo -e "${YELLOW}[4/6] Instalando dependências do backend...${NC}"
cd "$WEBUI_DIR"
npm install --production
echo -e "${GREEN}Dependências do backend instaladas${NC}"

# Rebuild do frontend
echo -e "${YELLOW}[5/6] Reconstruindo frontend...${NC}"
cd "$WEBUI_DIR/client"
npm install
npm run build
echo -e "${GREEN}Frontend reconstruído${NC}"

# Reiniciar serviço
echo -e "${YELLOW}[6/6] Iniciando serviço...${NC}"
systemctl start $SERVICE_NAME
sleep 2

if systemctl is-active --quiet $SERVICE_NAME; then
    echo -e "${GREEN}Serviço iniciado com sucesso!${NC}"
else
    echo -e "${RED}Erro ao iniciar serviço. Verifique os logs:${NC}"
    echo "  journalctl -u $SERVICE_NAME -f"
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Atualização concluída com sucesso!    ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Backup do banco: $BACKUP_FILE"
echo ""
echo "Verificar status: systemctl status $SERVICE_NAME"
echo "Ver logs:         journalctl -u $SERVICE_NAME -f"
echo ""
