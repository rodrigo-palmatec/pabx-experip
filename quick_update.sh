#!/bin/bash

# Script de atualização rápida - Faz pull direto do GitHub
# Execute: sudo bash quick_update.sh

set -e

echo "=========================================="
echo "  ATUALIZAÇÃO RÁPIDA - PABX EXPERIP"
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

PABX_DIR="/opt/pabx-experip-webui"

if [ ! -d "$PABX_DIR" ]; then
    error "Diretório $PABX_DIR não encontrado"
fi

cd $PABX_DIR

# 1. Backup rápido
log "Fazendo backup rápido..."
cp -r ../pabx-experip-webui ../pabx-experip-webui.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# 2. Parar serviço
log "Parando PABX WebUI..."
systemctl stop pabx-webui || warn "Serviço já parado"

# 3. Pull do GitHub
log "Atualizando código do GitHub..."
git pull origin master || error "Falha no git pull"

# 4. Instalar dependências
log "Atualizando dependências..."
cd webui/server
npm install --production || warn "Falha npm install (backend)"

cd ../client
npm install || warn "Falha npm install (frontend)"

# 5. Build
log "Fazendo build do frontend..."
npm run build || error "Falha no build"

# 6. Reiniciar
log "Reiniciando serviços..."
cd ../..
systemctl start pabx-webui || error "Falha ao iniciar pabx-webui"

# 7. Verificar
sleep 3
if systemctl is-active --quiet pabx-webui; then
    log "✅ PABX WebUI atualizado com sucesso!"
    echo ""
    echo "Acesse: http://seu-servidor:3000"
    echo "Log: sudo journalctl -u pabx-webui -f"
else
    error "❌ Falha ao iniciar o serviço"
fi
