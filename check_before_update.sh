#!/bin/bash

echo "Verificação pré-atualização do PABX"
echo "================================"

# Verificar diretórios
echo "✅ Diretórios encontrados:"
ls -la /opt/ | grep pabx

# Verificar se é repositório git
if [ -d "/opt/pabx-experip-webui/.git" ]; then
    echo "✅ Repositório git encontrado"
    cd /opt/pabx-experip-webui
    echo "Branch atual: $(git branch --show-current)"
    echo "Último commit: $(git log -1 --oneline)"
else
    echo "❌ Repositório git não encontrado"
fi

# Verificar serviços
echo ""
echo "✅ Status dos serviços:"
systemctl is-active asterisk 2>/dev/null && echo "Asterisk: ATIVO" || echo "Asterisk: INATIVO"
systemctl is-active nginx 2>/dev/null && echo "Nginx: ATIVO" || echo "Nginx: INATIVO"
systemctl is-active pabx-webui 2>/dev/null && echo "PABX WebUI: ATIVO" || echo "PABX WebUI: INATIVO"

# Verificar banco
echo ""
echo "✅ Banco de dados:"
mysql -u root -p -e "SHOW DATABASES LIKE 'pabx_db';" 2>/dev/null && echo "Banco pabx_db: ENCONTRADO" || echo "Banco pabx_db: NÃO ENCONTRADO"

# Verificar portas
echo ""
echo "✅ Portas ativas:"
netstat -tlnp | grep -E ':(3000|5060|8080|80|443)' | head -5

echo ""
echo "Se tudo estiver OK, pode executar: sudo bash /tmp/update_production.sh"
