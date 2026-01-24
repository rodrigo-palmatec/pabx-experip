# PABX Experip - Sistema de Telefonia IP

**Palmatec** - Fork do Asterisk com Interface Web de Gerenciamento

## 📋 Requisitos

- **Sistema Operacional:** Debian 11 (Bullseye)
- **Memória RAM:** Mínimo 2GB (recomendado 4GB+)
- **Disco:** Mínimo 20GB
- **CPU:** 2+ cores recomendado
- **Rede:** IP fixo configurado

## 🚀 Instalação Rápida

### Passo 1: Copiar arquivos para o servidor

Copie todo o repositório para o servidor Debian 11:

```bash
# Via SCP (do seu computador)
scp -r pabx-experip/ usuario@servidor:/tmp/

# No servidor
sudo mv /tmp/pabx-experip /usr/src/
cd /usr/src/pabx-experip/install
```

### Passo 2: Instalar o Asterisk

```bash
sudo chmod +x install-debian11.sh
sudo ./install-debian11.sh
```

Este script irá:
- Atualizar o sistema
- Instalar todas as dependências
- Compilar e instalar o Asterisk
- Configurar o serviço systemd
- Criar configurações básicas PJSIP
- Configurar AMI e ARI

**⏱️ Tempo estimado:** 15-30 minutos (dependendo do hardware)

### Passo 3: Instalar a Interface Web

```bash
sudo chmod +x install-webui.sh
sudo ./install-webui.sh
```

Este script irá:
- Instalar e configurar a interface web
- Configurar Nginx como proxy reverso
- Criar o serviço systemd

## 🔐 Acesso à Interface Web

Após a instalação, acesse:

```
http://IP_DO_SERVIDOR
```

**Credenciais padrão:**
- Usuário: `admin`
- Senha: Exibida ao final da instalação e salva em `/etc/pabx-experip/webui.conf`

⚠️ **IMPORTANTE:** Altere a senha padrão após o primeiro acesso!

## 📱 Funcionalidades da Interface Web

### Dashboard
- Status do Asterisk em tempo real
- Ramais online/offline
- Chamadas ativas
- Uso de recursos do sistema

### Ramais
- Criar/editar/excluir ramais PJSIP
- Visualizar status de registro
- Configurar senha SIP e contexto

### Troncos
- Configurar conexões com provedores VoIP
- Monitorar status de registro
- Gerenciar autenticação SIP

### Chamadas
- Monitorar chamadas em tempo real
- Originar chamadas via interface
- Desligar chamadas ativas

### Sistema
- Recarregar configurações
- Executar comandos CLI
- Visualizar logs

## ⚙️ Comandos Úteis

### Asterisk

```bash
# Status do serviço
sudo systemctl status asterisk

# Iniciar/parar/reiniciar
sudo systemctl start asterisk
sudo systemctl stop asterisk
sudo systemctl restart asterisk

# Console CLI interativo
sudo asterisk -rvvv

# Executar comando único
sudo asterisk -rx "pjsip show endpoints"
```

### Interface Web

```bash
# Status do serviço
sudo systemctl status pabx-webui

# Ver logs
sudo journalctl -u pabx-webui -f

# Reiniciar
sudo systemctl restart pabx-webui
```

## 📁 Estrutura de Diretórios

```
/etc/asterisk/          # Configurações do Asterisk
/var/log/asterisk/      # Logs do Asterisk
/var/spool/asterisk/    # Voicemail, gravações, etc
/var/lib/asterisk/      # Sons, MOH, etc
/opt/pabx-experip-webui/ # Interface web
/etc/pabx-experip/      # Credenciais do sistema
```

## 🔧 Configuração de Ramais

### Via Interface Web
1. Acesse **Ramais** no menu
2. Clique em **Novo Ramal**
3. Preencha: número, nome e senha
4. Clique em **Salvar**

### Configuração no Softphone/Telefone IP

| Campo | Valor |
|-------|-------|
| Servidor SIP | IP do servidor |
| Porta | 5060 |
| Usuário | Número do ramal |
| Senha | Senha configurada |
| Protocolo | UDP ou TCP |

## 🔗 Configuração de Tronco SIP

### Via Interface Web
1. Acesse **Troncos** no menu
2. Clique em **Novo Tronco**
3. Preencha os dados do provedor VoIP
4. Clique em **Criar Tronco**

### Dados necessários do provedor:
- Host/IP do servidor SIP
- Usuário de autenticação
- Senha de autenticação
- Codecs suportados

## 🔥 Firewall

Portas que devem estar abertas:

| Porta | Protocolo | Descrição |
|-------|-----------|-----------|
| 22 | TCP | SSH |
| 80 | TCP | Interface Web HTTP |
| 443 | TCP | Interface Web HTTPS |
| 5060 | UDP/TCP | SIP |
| 5061 | TCP | SIP TLS |
| 10000-20000 | UDP | RTP (mídia) |

## 🔒 Segurança

1. **Altere as senhas padrão** imediatamente após a instalação
2. **Configure firewall** para bloquear portas não utilizadas
3. **Use senhas fortes** para ramais e troncos
4. **Mantenha o sistema atualizado**
5. **Configure Fail2Ban** para proteção contra força bruta

## 🐛 Solução de Problemas

### Asterisk não inicia
```bash
# Ver logs de erro
sudo journalctl -u asterisk -n 50

# Verificar sintaxe das configurações
sudo asterisk -C /etc/asterisk/asterisk.conf -c
```

### Ramal não registra
```bash
# Verificar status PJSIP
sudo asterisk -rx "pjsip show endpoints"

# Ver logs de registro
sudo tail -f /var/log/asterisk/messages
```

### Interface web não carrega
```bash
# Verificar serviço
sudo systemctl status pabx-webui
sudo systemctl status nginx

# Ver logs
sudo journalctl -u pabx-webui -f
```

## 📞 Suporte

Para suporte técnico, entre em contato com a **Palmatec**.

---

**PABX Experip** - Desenvolvido pela Palmatec
