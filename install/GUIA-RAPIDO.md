# Guia Rápido de Instalação - PABX Experip

## Para quem não tem experiência com linha de comando

Este guia simplificado vai te ajudar a instalar o sistema passo a passo.

---

## 📋 O que você precisa

1. Um servidor/VPS com **Debian 11** instalado
2. Acesso SSH ao servidor (usuário root ou com sudo)
3. Conexão com a internet

---

## 🔧 Passo a Passo

### 1. Acesse seu servidor via SSH

No Windows, use o **PuTTY** ou **Windows Terminal**:
```
ssh usuario@IP_DO_SERVIDOR
```

### 2. Baixe o código do repositório

Se você tem o código em um pen drive ou enviou por FTP, copie para `/usr/src/`

Ou clone do repositório:
```bash
sudo apt update
sudo apt install git -y
cd /usr/src
sudo git clone SEU_REPOSITORIO pabx-experip
```

### 3. Execute o instalador

```bash
cd /usr/src/pabx-experip/install
sudo chmod +x *.sh
sudo ./install-debian11.sh
```

**Aguarde a instalação terminar** (pode demorar 15-30 minutos).

### 4. Instale a interface web

```bash
sudo ./install-webui.sh
```

### 5. Pronto!

Ao final da instalação, você verá:
- **Endereço de acesso**: http://IP_DO_SERVIDOR
- **Usuário**: admin
- **Senha**: (exibida na tela)

**ANOTE A SENHA!** Ela também está salva em `/etc/pabx-experip/webui.conf`

---

## 📱 Configurando um Telefone/Softphone

### Dados para configurar:

| Campo | O que colocar |
|-------|---------------|
| **Servidor/Host** | IP do seu servidor |
| **Porta** | 5060 |
| **Usuário** | Número do ramal (ex: 1001) |
| **Senha** | A senha que você definiu na interface |

### Softphones gratuitos recomendados:
- **Windows/Mac**: Zoiper, MicroSIP
- **Android**: Zoiper, Grandstream Wave
- **iPhone**: Zoiper, Groundwire

---

## 🆘 Se algo der errado

### O instalador parou com erro
```bash
# Veja o que aconteceu
sudo journalctl -u asterisk -n 100
```

### Não consigo acessar a interface web
```bash
# Verifique se os serviços estão rodando
sudo systemctl status asterisk
sudo systemctl status pabx-webui
sudo systemctl status nginx
```

### Esqueci a senha do admin
```bash
# Veja a senha salva
sudo cat /etc/pabx-experip/webui.conf
```

---

## 📞 Testando se funciona

1. Acesse a interface web
2. Crie um ramal (ex: 1001)
3. Configure seu softphone com os dados do ramal
4. Na interface, vá em **Dashboard** e veja se o ramal aparece como **Online**
5. Disque `*43` para fazer o teste de eco (você vai ouvir sua própria voz)

---

**Palmatec** - PABX Experip
