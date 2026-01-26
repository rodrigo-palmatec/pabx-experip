# PABX Experip - Web Interface

Interface web moderna para gerenciamento do PABX Asterisk com funcionalidades avançadas.

## 🚀 Instalação Automática

Execute o script de instalação automática:

```bash
# Baixar e executar
curl -fsSL https://raw.githubusercontent.com/rodrigo-palmatec/pabx-experip/master/install.sh | sudo bash

# Ou manualmente:
wget https://raw.githubusercontent.com/rodrigo-palmatec/pabx-experip/master/install.sh
chmod +x install.sh
sudo bash install.sh
```

## 📋 Requisitos do Sistema

- **SO:** Debian 11+ / Ubuntu 20.04+
- **Node.js:** 18+ (automático)
- **PostgreSQL:** 13+ (automático)
- **Nginx:** (automático)
- **Asterisk:** 18+ (deve ser instalado separadamente)

## 🔧 Instalação Manual

### 1. Clonar repositório
```bash
git clone https://github.com/rodrigo-palmatec/pabx-experip.git /opt/pabx-experip-webui
cd /opt/pabx-experip-webui
```

### 2. Instalar dependências
```bash
# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# PostgreSQL
apt-get install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
```

### 3. Configurar banco PostgreSQL
```bash
sudo -u postgres psql << EOF
CREATE DATABASE pabx_db;
CREATE USER pabx_user WITH PASSWORD 'pabx123';
GRANT ALL PRIVILEGES ON DATABASE pabx_db TO pabx_user;
\q
EOF
```

### 4. Instalar dependências da aplicação
```bash
cd webui/server
npm install --production
npm install pg pg-hstore multer

cd ../client
npm install
npm run build
```

### 5. Configurar banco de dados
Substitua `webui/server/database/index.js`:
```javascript
const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'pabx_db',
  username: 'pabx_user',
  password: 'pabx123',
  logging: false,
  define: {
    timestamps: true,
    underscored: false
  }
});

module.exports = sequelize;
```

### 6. Configurar Nginx
Criar `/etc/nginx/sites-available/pabx.experip.cloud`:
```nginx
server {
    listen 80;
    server_name pabx.experip.cloud;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Ativar site:
```bash
ln -s /etc/nginx/sites-available/pabx.experip.cloud /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 7. Criar serviço systemd
Criar `/etc/systemd/system/pabx-webui.service`:
```ini
[Unit]
Description=PABX Experip - Interface Web
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/pabx-experip-webui/webui/server
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Iniciar serviço:
```bash
systemctl daemon-reload
systemctl enable pabx-webui
systemctl start pabx-webui
```

### 8. Criar usuário administrador
```bash
sudo -u postgres psql -d pabx_db << EOF
INSERT INTO users (username, password, name, administrator, superAdministrator, enabled, created_at, updated_at) 
VALUES ('admin', '\$2a\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrador', true, true, true, NOW(), NOW());
\q
EOF
```

## 🔐 Acesso Padrão

- **URL:** `http://pabx.experip.cloud`
- **Usuário:** `admin`
- **Senha:** `admin123`

## 📋 Funcionalidades

### ✅ Fase 1 - Funcionalidades Críticas
- Ramais (Peers)
- Troncos (Trunks)
- Filas (Queues)
- URA/IVR
- Conferências
- Grupos
- Perfis
- Centros de Custo
- Relatórios de Chamadas (CDR)
- Click-to-Call
- Contatos
- Callbacks

### ✅ Fase 2 - Funcionalidades Avançadas
- **Regras Customizadas** - Builder de condições e ações
- **Gravações de Chamadas** - Player, download, gerenciamento
- **Horários de Atendimento** - Destinos fora do horário
- **Rotas Avançadas** - Entrada/Saída com selects dinâmicos

### ✅ Fase 3 - Funcionalidades Complementares
- **Dashboard** - Estatísticas em tempo real
- **Blacklist** - Import/export CSV, busca, filtros
- **Sistema** - Console CLI, reload de módulos

## 🔧 Configuração do Asterisk

### AMI Manager
Configure `/etc/asterisk/manager.conf`:
```ini
[general]
enabled = yes
port = 5038
bindaddr = 127.0.0.1
displayconnects = yes

[admin]
secret = admin_secret
permit = 127.0.0.1/255.255.255.255
read = system,call,log,verbose,command,agent,user,config
write = command,originate
```

### Gravações de Chamadas
Criar diretório:
```bash
mkdir -p /var/spool/asterisk/monitor
chown asterisk:asterisk /var/spool/asterisk/monitor
```

## 🔄 Atualizações

Para atualizar o sistema:
```bash
cd /opt/pabx-experip-webui
git pull origin master
cd webui/client
npm install && npm run build
cd ../server
npm install --production
systemctl restart pabx-webui
```

## 🐛 Troubleshooting

### Verificar status dos serviços:
```bash
systemctl status pabx-webui
systemctl status nginx
systemctl status postgresql
```

### Verificar logs:
```bash
sudo journalctl -u pabx-webui -f
sudo journalctl -u nginx -f
```

### Testar conexão com banco:
```bash
sudo -u postgres psql -d pabx_db -c "SELECT 1;"
```

### Verificar porta da aplicação:
```bash
ss -tlnp | grep 3000
```

## 📝 Notas Importantes

1. **PostgreSQL é obrigatório** - SQLite não é mais suportado em produção
2. **SSL recomendado** - Use certbot para certificado Let's Encrypt
3. **Backup regular** - Faça backup do banco PostgreSQL
4. **Firewall** - Configure portas 80, 443, 5038 (AMI)

## 📞 Suporte

- **Issues:** https://github.com/rodrigo-palmatec/pabx-experip/issues
- **Wiki:** https://wiki.native-infinity.com.br/
- **Documentação Asterisk:** https://docs.asterisk.org/

---

**Desenvolvido por:** Palmatec Tecnologia  
**Licença:** GPL v2
