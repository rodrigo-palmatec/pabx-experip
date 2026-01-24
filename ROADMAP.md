# PABX Experip - Roadmap de Desenvolvimento

## 📊 Análise da API de Referência (Native Infinity)

Baseado na documentação do Swagger do sistema white-label, identificamos as seguintes funcionalidades a serem implementadas.

---

## 🎯 Funcionalidades Identificadas

### ✅ Já Implementado

- **Autenticação (Token)**
  - `POST /api/auth/login` - Login e geração de JWT
  - Sistema de permissões básico

- **Ramais (Peers) - Básico**
  - `GET /api/extensions` - Listar ramais
  - `POST /api/extensions` - Criar ramal
  - `PUT /api/extensions/:id` - Atualizar ramal
  - `DELETE /api/extensions/:id` - Deletar ramal

- **Troncos (Trunks) - Básico**
  - `GET /api/trunks` - Listar troncos
  - `POST /api/trunks` - Criar tronco
  - `PUT /api/trunks/:id` - Atualizar tronco
  - `DELETE /api/trunks/:id` - Deletar tronco

---

## 🚀 Funcionalidades a Implementar

### **Fase 1: Gestão Avançada de Ramais** (Prioridade Alta)

#### 1.1 Categorias de Ramais
Categorias permitem agrupar ramais com configurações comuns.

**Campos da Categoria:**
```json
{
  "name": "Categoria Teste",
  "description": "Descrição da categoria",
  "nat": true,
  "voicemail": true,
  "lock": true,
  "followme": true,
  "passwordCall": false,
  "monitor": "all",
  "callLimit": 1,
  "timeout": 60,
  "timeRestrictionStart": "08:00:00",
  "timeRestrictionEnd": "18:00:00",
  "overflowExtension": "1000"
}
```

**Endpoints:**
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Buscar categoria
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Deletar categoria

**Funcionalidades:**
- NAT (Network Address Translation)
- Voicemail (Caixa postal)
- Lock (Bloqueio de chamadas)
- Follow-me (Encaminhamento)
- Password Call (Senha para chamadas)
- Monitor (Gravação: all, none, in, out)
- Call Limit (Limite de chamadas simultâneas)
- Timeout (Tempo de toque)
- Time Restriction (Restrição de horário)
- Overflow Extension (Ramal de transbordamento)

#### 1.2 Grupos de Ramais
Grupos permitem organizar ramais logicamente.

**Campos do Grupo:**
```json
{
  "name": "Grupo Vendas",
  "description": "Grupo do setor de vendas"
}
```

**Endpoints:**
- `GET /api/groups` - Listar grupos
- `GET /api/groups/:id` - Buscar grupo
- `POST /api/groups` - Criar grupo
- `PUT /api/groups/:id` - Atualizar grupo
- `DELETE /api/groups/:id` - Deletar grupo

#### 1.3 Perfis de Ramal
Perfis definem permissões de discagem (rotas de saída).

**Campos do Perfil:**
```json
{
  "name": "Somente Local",
  "description": "Permite apenas chamadas locais",
  "OutRoutes": [
    {
      "id": 8,
      "name": "Rota Local"
    }
  ]
}
```

**Endpoints:**
- `GET /api/profiles` - Listar perfis
- `GET /api/profiles/:id` - Buscar perfil
- `POST /api/profiles` - Criar perfil
- `PUT /api/profiles/:id` - Atualizar perfil
- `DELETE /api/profiles/:id` - Deletar perfil

#### 1.4 Centros de Custo
Centros de custo permitem rastrear gastos por departamento.

**Campos do Centro de Custo:**
```json
{
  "name": "Vendas",
  "description": "Centro de custo do setor de vendas"
}
```

**Endpoints:**
- `GET /api/costCenters` - Listar centros de custo
- `GET /api/costCenters/:id` - Buscar centro de custo
- `POST /api/costCenters` - Criar centro de custo
- `PUT /api/costCenters/:id` - Atualizar centro de custo
- `DELETE /api/costCenters/:id` - Deletar centro de custo

#### 1.5 Ramais Completos
Atualizar modelo de ramais para incluir todos os campos.

**Campos Adicionais do Ramal:**
```json
{
  "username": "100",
  "secret": "senha123",
  "name": "João Silva",
  "email": "joao@empresa.com",
  "callCenter": false,
  "hideOnAgenda": false,
  "sipRegStatus": "AVAILABLE",
  "sipIp": "192.168.1.100",
  "newVoicemail": false,
  "dynamic": false,
  "webrtc": true,
  "provisioning": false,
  "deviceBrand": "Yealink",
  "deviceModel": "T46S",
  "deviceMac": "00:15:65:12:34:56",
  "profileId": 1,
  "categoryId": 1,
  "costCenterId": 1,
  "Groups": [1, 2]
}
```

---

### **Fase 2: Filas de Atendimento** (Prioridade Alta)

#### 2.1 Filas (Queues)
Sistema de filas para atendimento organizado.

**Funcionalidades:**
- Estratégia de distribuição (ringall, leastrecent, fewestcalls, random, rrmemory)
- Música de espera
- Timeout de atendimento
- Anúncios periódicos
- Membros estáticos e dinâmicos
- Prioridade de chamadas
- Estatísticas em tempo real

**Endpoints:**
- `GET /api/queues` - Listar filas
- `GET /api/queues/:id` - Buscar fila
- `POST /api/queues` - Criar fila
- `PUT /api/queues/:id` - Atualizar fila
- `DELETE /api/queues/:id` - Deletar fila
- `GET /api/queues/:id/members` - Listar membros da fila
- `POST /api/queues/:id/members` - Adicionar membro
- `DELETE /api/queues/:id/members/:memberId` - Remover membro

---

### **Fase 3: Click-to-Call** (Prioridade Média)

#### 3.1 API de Click-to-Call
Permite iniciar chamadas via API.

**Endpoints:**
- `POST /api/calls` - Iniciar chamada
- `GET /nativeApis` - Obter configurações
- `PUT /nativeApis/:id` - Atualizar configurações

**Exemplo de Chamada:**
```json
{
  "origem": "100",
  "destino": "1002"
}
```

**Resposta:**
```json
{
  "exten": "100",
  "destination": "1002",
  "profile": "interno",
  "context": "clicktocall",
  "uniqueid": "clicktocall-1614003741062",
  "callStatus": "Call established"
}
```

---

### **Fase 4: Relatórios** (Prioridade Média)

#### 4.1 Relatórios de Chamadas
Sistema de relatórios baseado em CDR (Call Detail Records).

**Tipos de Relatórios:**
- Relatório de ligações
- Chamadas fora do horário
- Chamadas por ramal
- Chamadas por tronco
- Chamadas por centro de custo
- Tempo médio de atendimento
- Taxa de abandono

**Endpoints:**
- `GET /api/reports/calls` - Relatório de chamadas
- `GET /api/reports/off-hours` - Chamadas fora do horário
- `GET /api/reports/by-peer` - Por ramal
- `GET /api/reports/by-trunk` - Por tronco
- `GET /api/reports/by-cost-center` - Por centro de custo

**Filtros:**
- Data inicial e final
- Ramal
- Tronco
- Centro de custo
- Tipo de chamada (inbound, outbound, internal)
- Status (answered, no-answer, busy, failed)

---

### **Fase 5: Plano de Discagem Avançado** (Prioridade Média)

#### 5.1 Rotas de Entrada (Inbound Routes)
Roteamento de chamadas recebidas.

**Funcionalidades:**
- DID/DDR (número discado)
- Horário de atendimento
- Destino (ramal, fila, URA, grupo)
- Fallback (destino alternativo)

#### 5.2 Rotas de Saída (Outbound Routes)
Roteamento de chamadas efetuadas.

**Funcionalidades:**
- Padrões de discagem (regex)
- Ordem de prioridade
- Troncos (primário, secundário)
- Prefixos (adicionar/remover)
- Restrições por perfil

#### 5.3 Rotas Internas
Roteamento entre ramais.

#### 5.4 Callbacks
Sistema de retorno de chamada.

---

### **Fase 6: Horários e Eventos** (Prioridade Média)

#### 6.1 Horários de Atendimento
Define quando o sistema está ativo.

**Funcionalidades:**
- Horários por dia da semana
- Múltiplos períodos por dia
- Destino dentro do horário
- Destino fora do horário

#### 6.2 Turnos de Trabalho
Gestão de turnos de atendentes.

#### 6.3 Eventos/Feriados
Calendário de feriados e eventos especiais.

---

### **Fase 7: Funcionalidades Adicionais** (Prioridade Baixa)

#### 7.1 Agenda
- Agenda do ramal (privada)
- Agenda pública (compartilhada)

#### 7.2 Blacklists
Bloqueio de números indesejados.

#### 7.3 Conferências
Salas de conferência.

#### 7.4 Música de Espera (MOH)
Gestão de arquivos de áudio.

#### 7.5 Monitoramento
- Painel em tempo real
- Status de ramais
- Chamadas ativas
- Estatísticas

#### 7.6 Regras Customizadas
- Avaliações de atendimento
- Regras personalizadas

#### 7.7 APIs Externas
Integração com sistemas externos.

#### 7.8 Grupos de Chat
Sistema de mensagens internas.

---

## 📅 Cronograma Sugerido

### Sprint 1 (2 semanas) - Categorias e Grupos
- Implementar modelo de dados para Categorias
- Criar endpoints CRUD de Categorias
- Implementar modelo de dados para Grupos
- Criar endpoints CRUD de Grupos
- Atualizar interface web para gerenciar Categorias e Grupos
- Vincular ramais a Categorias e Grupos

### Sprint 2 (2 semanas) - Perfis e Centros de Custo
- Implementar modelo de dados para Perfis
- Criar endpoints CRUD de Perfis
- Implementar modelo de dados para Centros de Custo
- Criar endpoints CRUD de Centros de Custo
- Atualizar modelo de Ramais para incluir todos os campos
- Atualizar interface web

### Sprint 3 (3 semanas) - Filas de Atendimento
- Implementar modelo de dados para Filas
- Criar endpoints CRUD de Filas
- Implementar lógica de distribuição de chamadas
- Criar interface de gerenciamento de filas
- Implementar painel de monitoramento de filas

### Sprint 4 (2 semanas) - Click-to-Call
- Implementar API de Click-to-Call
- Criar sistema de validação de origem/destino
- Implementar configurações de Click-to-Call
- Documentar API

### Sprint 5 (3 semanas) - Relatórios
- Implementar CDR (Call Detail Records)
- Criar endpoints de relatórios
- Implementar filtros e agregações
- Criar interface de relatórios
- Implementar exportação (CSV, PDF)

### Sprint 6 (3 semanas) - Plano de Discagem
- Implementar Rotas de Entrada
- Implementar Rotas de Saída
- Implementar Rotas Internas
- Criar interface de gerenciamento de rotas

### Sprint 7 (2 semanas) - Horários e Eventos
- Implementar Horários de Atendimento
- Implementar Turnos de Trabalho
- Implementar Eventos/Feriados
- Integrar com Rotas de Entrada

### Sprint 8+ - Funcionalidades Adicionais
- Implementar funcionalidades restantes conforme prioridade

---

## 🗄️ Estrutura de Banco de Dados

### Tabelas Principais

```sql
-- Categorias
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  nat BOOLEAN DEFAULT true,
  voicemail BOOLEAN DEFAULT true,
  lock BOOLEAN DEFAULT false,
  followme BOOLEAN DEFAULT false,
  passwordCall BOOLEAN DEFAULT false,
  monitor ENUM('all', 'none', 'in', 'out') DEFAULT 'none',
  callLimit INT DEFAULT 1,
  timeout INT DEFAULT 60,
  timeRestrictionStart TIME,
  timeRestrictionEnd TIME,
  overflowExtension VARCHAR(20),
  createdBy VARCHAR(50),
  updatedBy VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Grupos
CREATE TABLE groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  createdBy VARCHAR(50),
  updatedBy VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Perfis
CREATE TABLE profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  createdBy VARCHAR(50),
  updatedBy VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Centros de Custo
CREATE TABLE cost_centers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  createdBy VARCHAR(50),
  updatedBy VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Ramais (atualizado)
CREATE TABLE peers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  secret VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  callCenter BOOLEAN DEFAULT false,
  hideOnAgenda BOOLEAN DEFAULT false,
  sipRegStatus VARCHAR(20),
  sipIp VARCHAR(45),
  newVoicemail BOOLEAN DEFAULT false,
  dynamic BOOLEAN DEFAULT false,
  webrtc BOOLEAN DEFAULT false,
  provisioning BOOLEAN DEFAULT false,
  deviceBrand VARCHAR(50),
  deviceModel VARCHAR(50),
  deviceMac VARCHAR(17),
  profileId INT,
  categoryId INT,
  costCenterId INT,
  createdBy VARCHAR(50),
  updatedBy VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (profileId) REFERENCES profiles(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id),
  FOREIGN KEY (costCenterId) REFERENCES cost_centers(id)
);

-- Relação Ramal-Grupo (N:N)
CREATE TABLE peer_groups (
  peerId INT,
  groupId INT,
  PRIMARY KEY (peerId, groupId),
  FOREIGN KEY (peerId) REFERENCES peers(id) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
);

-- Filas
CREATE TABLE queues (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  extension VARCHAR(20) NOT NULL UNIQUE,
  strategy ENUM('ringall', 'leastrecent', 'fewestcalls', 'random', 'rrmemory') DEFAULT 'ringall',
  timeout INT DEFAULT 30,
  maxWaitTime INT DEFAULT 300,
  announceFrequency INT DEFAULT 60,
  mohClass VARCHAR(50),
  createdBy VARCHAR(50),
  updatedBy VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Membros de Fila
CREATE TABLE queue_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  queueId INT NOT NULL,
  peerId INT NOT NULL,
  penalty INT DEFAULT 0,
  paused BOOLEAN DEFAULT false,
  FOREIGN KEY (queueId) REFERENCES queues(id) ON DELETE CASCADE,
  FOREIGN KEY (peerId) REFERENCES peers(id) ON DELETE CASCADE
);
```

---

## 🎨 Melhorias na Interface Web

### Páginas a Criar/Atualizar

1. **Ramais**
   - Adicionar campos: Categoria, Grupo, Perfil, Centro de Custo
   - Filtros por categoria, grupo, status
   - Ações em lote

2. **Categorias** (Nova)
   - CRUD completo
   - Visualização de ramais por categoria

3. **Grupos** (Nova)
   - CRUD completo
   - Gestão de membros

4. **Perfis** (Nova)
   - CRUD completo
   - Associação com rotas de saída

5. **Centros de Custo** (Nova)
   - CRUD completo
   - Relatórios por centro de custo

6. **Filas** (Nova)
   - CRUD completo
   - Gestão de membros
   - Monitoramento em tempo real

7. **Relatórios** (Nova)
   - Dashboard com gráficos
   - Filtros avançados
   - Exportação

---

## 🔧 Tecnologias e Ferramentas

### Backend
- Node.js + Express (já implementado)
- Sequelize ORM (para gerenciar banco de dados)
- Asterisk AMI/ARI (já implementado)

### Frontend
- React (já implementado)
- Chart.js ou Recharts (para gráficos de relatórios)
- Socket.IO (para monitoramento em tempo real)

### Banco de Dados
- MySQL ou PostgreSQL (recomendado)
- Migrations com Sequelize

---

## 📝 Próximos Passos

1. **Revisar e aprovar o roadmap**
2. **Escolher a primeira sprint para implementar**
3. **Configurar banco de dados (MySQL/PostgreSQL)**
4. **Implementar modelos de dados**
5. **Criar endpoints da API**
6. **Desenvolver interface web**
7. **Testar e validar**

---

## 💡 Observações

- Todas as funcionalidades devem manter compatibilidade com a API de referência
- Priorizar funcionalidades mais utilizadas pelos usuários
- Manter documentação atualizada
- Implementar testes automatizados
- Seguir padrões de código estabelecidos

---

**Última atualização:** 24/01/2026
