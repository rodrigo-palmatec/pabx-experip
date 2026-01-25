# Native Wiki - Conteúdo Completo

Gerado em: 2026-01-25 13:38:02

---

## Sobre o Infinity

**URL:** https://wiki.native-infinity.com.br/

# Sobre o Infinity

Info

A documentação presente nesta Wiki usa como base versões mais atuais do Native Infinity.
Caso alguma funcionalidade apresentada não esteja disponível em seu servidor deve ser verificado a versão e caso necessário atualizá-lo.

**Versão atual:** 1.141.0

### Seja bem-vindo a Wiki do Native Infinity!

Aqui você encontrará uma série de informações que irão auxiliar você a compreender como configurar e utilizar o Native Infinity. Nos menus abaixo serão abordadas todas as principais configurações necessárias para ser possível criar um fluxo de atendimento para seu negócio, que vai desde a configuração dos troncos, interligando assim o Native com a sua operadora, até os ramais que farão o atendimento final das suas ligações, contemplando todos os módulos existentes.

Espero que aqui você possa sanar todas as suas dúvidas.

Dica

**Abaixo temos algumas dicas para o melhor uso e experiência da plataforma:**

🌐 Utilize os navegadores recomendados: **Google Chrome** ou **Microsoft Edge**.

🎧 Utilize fone e microfone via USB.

📶 Recomendamos sempre utilizar a rede cabeada ao invés do Wi-Fi.

🧩 Instale a extensão do Infinity em seu navegador para evitar quedas de conexão do
seu ramal:
**[Clique aqui para instalar a extensão](https://chrome.google.com/webstore/detail/native-infinity-extension/kfjdedahohjonofdcnbhnpdcgnjhgpcn?hl=pt-BR)**

🎤 Conceda as permissões de microfone em seu navegador.

🔔 Verifique se seu navegador possui permissão para exibição de notificações nas
configurações do Windows também.

🔋 Verifique se seu computador não está configurado no modo de economia de energia,
busque utilizar opções para alto desempenho.

---

## Agenda Pública

**URL:** https://wiki.native-infinity.com.br/agenda-publica/

# Agenda Pública

Em Agenda Pública, podem ser inseridos novos contatos que estão visíveis a todos os usuários do Native Infinity. Sendo possível inserir de forma manual ou através de um arquivo .CSV contendo vários contatos.

## Menu Agenda Pública

![Untitled](../img/agenda-publica/Untitled.png)

## Novo Contato

Caso opte por criar um novo contato:

![Untitled](../img/agenda-publica/Untitled%201.png)

* **Novo Contato:**
  Permite inserir um contato de forma manual.
* **Nome:**
  Deve ser inserido o nome do contato que deseja adicionar.
* **Empresa:**
  Campo onde deve ser inserido a empresa do contato (opcional).
* **Telefone:**
  Deve ser inserido o telefone do contato, respeitando o formato configurado em suas rotas de saída.
* **Setor:**
  Campo onde deve ser inserido o setor do contato (opcional).
* **E-mail:**
  Campo onde deve ser inserido o e-mail do contato (opcional).

## Importar Contatos

Caso opte por subir uma lista de usuários:

DICA

Para realizar a importação de contatos via lista deve ser utilizado um arquivo CSV conforme o exemplo **contacts\_example.csv**

É possível obter o arquivo **[clicando aqui](../download-files/contacts_example.csv)** ou realizar o download através do menu agenda pública do seu servidor infinity.

![Untitled](../img/agenda-publica/Untitled%202.png)

* **Lista de Contatos (CSV):**
  Neste campo deve ser inserido um arquivo .CSV contendo as colunas Nome, Empresa, Setor, Telefone, E-mail.

---

## Avisos

**URL:** https://wiki.native-infinity.com.br/avisos/

# Avisos

No menu "Avisos", será possível criar mensagens que serão exibidas após o login a um grupo de colaboradores ou a todos os colaboradores que tenham acesso ao Native Infinity. Desta forma, é possível gerar diferentes tipos de avisos, como avisos sobre manutenção preventiva, eventos específicos, instruções para as equipes, entre outros.

Vídeo Aula

## Menu Avisos

![Untitled](../img/avisos/Untitled.png)

* **Novo Aviso:**
  Para criar um aviso clique em Novo Aviso.
* **Nome:**
  Deve ser inserido o nome do aviso.
* **Mensagem:**
  Insira a mensagem que deseja transmitir aos colaboradores com acesso ao Native Infinity.
* **Grupos Notificados:**
  Escolha quais grupos receberão a mensagem ao realizarem o login no Native Infinity.
* **Status:**
  Permite abilitar ou desabilitar a mensagem.
* **Termina em:**
  Escolha o dia e horário em que a mensagem deixará de ser exibida.

Observação

Para os usuários que receberem a notificação, é possível marcar para que a mensagem não seja exibida novamente. Dessa forma, no próximo momento em que realizarem o login, a mensagem não será exibida novamente.

Abaixo uma imagem ilustrativa de como deve ser exibida a mensagem:

![Untitled](../img/avisos/Untitled1.png)

---

## Blacklist

**URL:** https://wiki.native-infinity.com.br/blacklist/

# Blacklist

Em Blacklist é possível criar listas de números indesejados, que podem ser posteriormente incluídos em rotas de entrada e saída. Isso permite bloquear chamadas recebidas desses números e também proibir a realização de chamadas para esses mesmos números.

Vídeo Aula

## Menu Blacklist

![Untitled](../img/blacklist/Untitled.png)

* **Nova Blacklist:**
  Para criar uma blacklist clique em Nova Backlist
* **Nome:**
  Deve ser inserido o nome da blacklist.
* **Descrição:**
  Permite preencher com uma breve descrição sobre do que se trata determinada blacklist, ou com informações pertinentes.
* **Adicionar por:**
  Possibilita escolher a forma com que irá adicionar a lista de números. Caso escolha por csv, é importante que na lista não contenha caracteres especiais. Caso escolha manual é possível acrescentar uma observação e o número desejado.

Observação

Criada a blacklist, será necessário atribuir a rota desejada em Plano de Discagem, sendo possível atribuir tanto para rotas de entrada quanto para rotas de saída.

Ao adicionar um número é importante levar em consideração como sua operadora entrega este número ao PABX, se com **0 + DDD + Número**, ou se somente **DDD + Número**. O mesmo vale para quando a blacklist for utilizada para rotas de saída, sendo necessário validar como o número será discado para o destino.

---

## Centro de Custos

**URL:** https://wiki.native-infinity.com.br/centro-de-custos/

# Centro de Custos

Em Centro de Custos podemos criar diferente centros por nome, que posteriormente podem ser vinculados a ramais e usuários, permitindo que você busque nos relatórios também por estes centros de custo. Desta forma, você poderá utilizar o Centro de Custo como uma forma de agrupar um número desejado de ramais e usuários, podendo agrupar, por exemplo, como setor, empresa, e etc…

## Menu Centro de Custos

![Untitled](../img/centro-de-custos/Untitled.png)

* **Novo Centro de Custo:**
  Permite criar uma novo Centro Custo.
* **Nome:**
  Nome do centro de custo que será exibido para nos relatórios.
* **Descrição:**
  Permite criar uma breve descrição sobre o centro de custo.

## Exemplo de uso

Em alguns relatórios, como o **[Relatório de Ligações](../relatorios/)**, será possível realizar buscas pelo Centro de Custo, tanto para a Origem quanto para destino.

![Untitled](../img/centro-de-custos/Untitled%201.png)

---

## Conferências

**URL:** https://wiki.native-infinity.com.br/conferencias/

# Conferências

Os agendamentos de salas de conferências, organizadas por senha, data e horário, tem como objetivo criar uma sala onde usuários internos ou externos realizam acesso por meio de um número comum que pode ser configurado no menu [Cod. Funcionalidades.](../codigo-de-funcionalidades/) As salas de conferências possuem senhas configuradas automaticamente e ao ligar para o número da sala de conferência, será solicitado a senha.

Vídeo Aula

## Menu Conferências

![Untitled](../img/conferencias/Untitled.png)

* **Nova Conferência:**
  Permite criar uma nova sala de conferência.
* **Assunto:**
  Deve ser informado o nome da sala de conferência.
* **Gravar:**
  Possibilita gravar as conversas realizadas na sala de conferência.
* **Senha:**
  É uma senha gerada automaticamente para acesso à sala de conferência.
* **Abertura:**
  Data e horário de início da sala, ou seja, antes da data inserida não será possível acessar a sala.
* **Encerramento:**
  Data e horário de encerramento da sala, ou seja, após a data inserida não será possível acessar a sala.

---

## Cód. Funcionalidades

**URL:** https://wiki.native-infinity.com.br/codigo-de-funcionalidades/

# Cód. Funcionalidades

Em Código de Funcionalidades, é possível escolher um código específico para cada função, que será digitado pelo atendente para a utilização dentre as opções existentes no menu, como, por exemplo, códigos para programar um siga-me em um ramal, para transferência ou estacionamento de ligações, captura de ligações, correio de voz, entre outros.

Vídeo Aula

## Menu Cod. de Funcionalidades

![Untitled](../img/codigos-de-funcionalidades/Untitled.png)

Em funcionalidades temos os campos:

![Untitled](../img/codigos-de-funcionalidades/Untitled%201.png)

Observação

Algumas funcionalidades podem exigir o uso de uma senha, será solicitado a senha durante o uso da funcionalidade.

A configuração de sua senha de funcionalidade ocorre no menu de **[usuários](../usuarios/)**

Para realizar a configuração de sua senha de funcionalidade é necessário entrar em contato com o administrador de seu servidor.

* **Código:**
  Caractere(s)/dígitos responsáveis pelo acionamento da funcionalidade.
* **Funcionalidade:**
  Nome dado a função que será acionada pelo código.
* **Descrição:**
  Breve descrição sobre a funcionalidade.

Dentre os principais códigos temos:

* **Dígitos para ligações externas:**
  Um ou mais dígitos para "puxar linha" para ligações externas. Exemplo: 0 (puxa a linha) + DDD + número, 0 019 99999-9999. Caso esteja também habilitado nas rotas de saída.
* **Perfil para transbordos:**
  Perfil criado no submenu Perfis, encontrado no menu Ramais utilizado para ligações de saída para transbordos de feriados, horários de expediente, etc.
* **Perfil para transferência:**
  Utilizado para transferência de ligações.
* **Transferência direta:**
  Transfere a ligação diretamente para o destino, onde o ramal que transfere não fala com o ramal atendente antes de concluir a transferência. Exemplo: ## + ramal
* **Transferência assistida:**

  Transfere após consultar o destino, ou seja, possibilita que o ramal que recebe a transferência fale antes com o ramal que transferiu, sendo necessário o desligamento por parte de um dos ramais para efetivar ou cancelar a transferência. Exemplo: \*\* + ramal
* **Cancelar transferência:**
  Cancela a transferência assistida, trazendo a ligação transferida de volta ao ramal.
* **Timeout da transferência assistida:**
  Tempo em segundos para atendimento de uma transferência assistida.
* **Puxar/Capturar ligação do grupo:**
  Captura a ligação de um ramal do grupo que está tocando.
* **Puxar/Capturar ligação de um ramal:**
  Captura a ligação de um ramal qualquer que está tocando, sendo necessário digitar o ramal que deseja puxar/capturar a ligação.
* **Estacionamento de ligações:**
  Coloca a ligação em espera para ser capturada de outro ramal. Onde ao digitar #72, o ramal será direcionado uma sala de estacionamento e, então, outra pessoa poderá ligar para esta sala e dar continuidade ao atendimento. Caso ninguém disque para a sala, a ligação deverá retornar a origem após o tempo estipulado em tempo de estacionamento.
* **Sala de conferência:**
  Ramal para acessar a sala de conferência agendada
* **Conferência no Ramal:**
  Para realizar a conferência em um ramal, basta simplesmente, estando em linha com um ramal, realizar uma transferência assistida para a outra pessoa com quem deseja acrescentar a transferência, quando a outra pessoa Atender é só discar \*2 e então você as outras duas pessoas estarão em conferência.

  + **Exemplo**: Ramal 1000 liga para 30139018 e está em conversação com a pessoa mas gostaria de adicionar um ramal interno ou, um número externo na mesma chamada. Para isto será necessário ativar a transferência assistida \*\* *digitar o número com quem gostaria de incluir na conferência (ex:* 1001) e, quando o destino atender, deve-se digitar o código de funcionalidade para ativação da conferência no ramal (\*2). Ao pressionar o código de conferência, será criada uma sala de conferência com os 3 canais, ramal 1000, número 30139018 e ramal 1001.

    Caso seja necessário adicionar um novo participante, por dentro da sala de conferência deve-se digitar o código de transferência assistida (\*+número destino) e, quando o destino atender, deve-se digitar o código de ativação da conferência (2), com isto, será adicionado o novo destino na conferência já existente, quem contém os outros participantes.
* **Rechamada:**
  Permite que o ramal que tenha discado para um número que não atendeu, receba uma ligação que irá discar novamente para o número que antes não atendeu, assim que este estiver disponível.

---

## Filas

**URL:** https://wiki.native-infinity.com.br/filas/

# Filas

As filas de atendimento são responsáveis por organizar um certo fluxo de ligações, separados por alguma especificidade ou necessidade, de modo que ligações direcionadas para uma fila, serão retidas até que possam ser atendidas por um dos membros dela, garantindo assim uma melhor forma de atendimento destas ligações. A entrega para os ramais pode ocorrer de diversas maneiras, seja ela por ordem ou não. Além da organização, a ligação estando em uma fila, pode-se aplicar áudios e anúncios personalizados para que o chamador obtenha informações pertinentes a ligação, como, por exemplo, um áudio institucional, ofertas de produtos ou anúncios de tempo previsto, ou posição em espera.

Vídeo Aula

## Menu Filas

![Untitled](../img/filas/Untitled.png)

* **Nova Fila:**
  Deve ser inserido o nome identificador da fila.

## Geral

Ao criar uma nova fila, na aba Geral serão disponibilizadas uma série de configurações que devem ser preenchidos, onde será possível optar entre uma fila de CallC enter para caso possua o Módulo de CallCenter, ou por uma fila que não estará vinculada ao Call Center.

![Untitled](../img/filas/Untitled1.png)

* **Nome:**
  Deve ser inserido o nome identificador da fila.
* **Ramal:**
  Inserimos o ramal da fila.
* **Descrição:**
  Pode ser acrescentado informações.
* **Bina:**
  Permite informar o número de telefone que será binado para quando os usuários desta fila realizarem ligações, sendo necessário também que sua operadora disponibilize tal permissão.
* **Prioridade:**
  Permite criar ordem de prioridade nas filas onde a fila que possuir um valor maior terá prioridade frente a outras filas que possuírem valores menores.
* **Chamada em uso:**
  Permite que um telefone toque ao receber uma ligação, mesmo que este já esteja em ligação.
* **Chamada em paralelo:**

  + Chamada em paralelo selecionada como não, então temos o seguinte comportamento: Uma chamada entra na fila, onde sua fila trabalha de forma serial, primeiro a chegar é o primeiro a ser atendido.
  + Chamadas em paralelo selecionada como sim, então temos o seguinte comportamento: Assim que uma chamada entra na fila de atendimento, ela automáticamente é direcionada para um atendente disponível.
* **Gravar Ligações:**
  Ao habilitar irá gravar todas as ligações recebidas ou realizadas pela fila.
* **CallCenter:**
  Habilita a fila como sendo do tipo call Center.
* **Música de espera:**
  Áudio tocado enquanto o chamador encontra-se em espera de atendimento. Este áudio deve ser importado obrigatoriamente nos formatos “.wav” ou “.mp3” no Menu Música de Espera.
* **Estratégia:**
  Modo que a fila irá entregar as ligações para os membros da fila.

  + **Aleatório**: Aciona o ramal de um membro livre aleatório.
  + **Linear**: Entrega as ligações para os membros em uma ordem pré-determinada por seleção de ramais. Nesta opção, os membros devem ser selecionados pela ordem desejada.
  + **Menos Recente:** Toca no ramal do membro livre que está há mais tempo sem receber chamadas.
  + **Menos Chamadas**: Toca no ramal do membro livre que possui menor número de chamadas.
  + **Rotacionado**: Rotaciona as ligações para os membros livres de formar circular.
  + **Todos os Ramais**: Toca todos os ramais dos membros livres ao mesmo tempo, onde o primeiro a atender fica com a ligação.
  + **Tempo chamando:**

  Tempo máximo (em segundos) em que uma ligação deverá permanecer na fila. É possível configurar um ramal para transbordo das ligações que excederem este tempo.
* **Pós atendimento:**

  Tempo estipulado (em segundos) para o momento que o atendente termina a ligação, durante este tempo o atendente não receberá ligações desta fila.
* **Tom de ring:**
  Determina se o chamador irá ouvir ou não o tom padrão de chamada.

  + **Sempre:** Ao invés de tocar um arquivo de áudio, será disparado ao chamador um tom de chamando convencional.
  + **Enquanto chama o ramal:** O áudio de espera será tocado enquanto o chamador permanece em espera, sem nenhum membro da fila disponível para atendimento, porém ao ser direcionada para um membro, este passara a escutar um tom de chamando convencional.
  + **Nunca:** Nesta modalidade o chamador escuta o áudio de espera até ser atendido por um membro da fila.
  + **Anúncios**:
    São anúncios de áudio informados ao chamador com informações relevantes ao atendimento, como o tempo estimado de espera e posição na fila de atendimento.
* **Tempo estimado de espera:**
  Ativa ou não o anúncio de tempo estimado para atendimento da fila. Estimativa realizada com base nos atendimentos anteriores.
* **Posição na fila:**
  Anuncia ao chamador a sua posição na fila de atendimento, quando não houverem agentes livres.
* **Periódico:**
  Ativa ou não um período para o anúncio de posição da fila. É possível escolher um áudio de sua preferência ou utilizar o padrão.

  + **Frequência:** Se ativado o “periódico”, determina a frequência em segundos, onde o chamador será informado sobre a sua posição na fila.
  + **Transbordo:**

  Opção de transbordar a fila para outro ramal, fila ou URA, após um tempo determinado ou quando estiver com todos atendentes ocupados.

  + **Quando atingir um timeout:** Quando atingir um tempo em segundos estipulados em Timeout da fila.
  + **Quando atingir um tamanho máximo:** Ou seja, quando atingir um número estipulado de ligações em espera por atendimento.
  + **Quando não houver agentes disponíveis:** Quando todos os agentes ou ramal estiverem em ligações ou quando nenhum agente ou ramal estiver registrado.

## Membros

Na aba membros é onde deve ser selecionado os membros que pertencerão a fila de atendimento.

![Untitled](../img/filas/Untitled2.png)

* **Membros:**
  Aqui selecionam-se os membros pertencentes a fila ramais ou agentes caso a fila seja de CallCenter.

## Regras Customizadas

Na aba de regras customizadas é possível adicionar uma regra específica criada no menu de regras customizadas.

DICA

Para criar e configurar regras customizadas você deve acessar o menu **[regras customizadas](../regras-customizadas/)**.

![Untitled](../img/filas/Untitled3.png)

* **Regras customizadas:**
  Aqui são listadas todas as regras disponíveis que podem ser inseridas a fila.
* **Antes da fila:**
  Seleciona regra(s) customizada(s) que serão executadas antes um atendimento realizado pela fila.
* **Depois da fila:**
  Seleciona regra(s) customizada(s) que serão executadas depois um atendimento realizado pela fila.

## Call Center

Esta aba estará disponível para utilização caso você possua o módulo de Call Center ativo, também será necessário ter escolhido a opção fila de Call Center na aba Geral. Aqui serão possíveis selecionar scripts, metas e pausas criadas no módulo de Call Center.

OBSERVAÇÃO

Para uso e configuração de opções de call center sua licença deve ser compátivel.

Em caso de dúvidas deve ser feito contato com equipe de suporte.

![Untitled](../img/filas/Untitled4.png)

* **Script de saída:**
  Permite selecionar um script ao final de um atendimento realizado pela fila.
* **Script de entrada:**
  Permite selecionar um script no início de um atendimento realizado pela fila.
* **iFrame de saída:**
  Permite inserir um iframe que será exibido na tela do agente ao final de um atendimento realizado pela fila.
* **iFrame de entrada:**
  Permite inserir um iframe que será exibido na tela do agente no início de um atendimento realizado pela fila.
* **Metas:**
  Possibilita inserir uma meta específica para a fila, que será exibida na tela do dashboard do módulo de Call Center.
* **Pausas:**
  Possibilita inserir uma pausa especifica para a fila.

---

## Grupos de Chats

**URL:** https://wiki.native-infinity.com.br/grupos-de-chat/

# Grupos de Chats

Permite a criação de um ou mais grupos usuários para troca de mensagens através do chat, sendo possível.

## Menu Grupos de Chat

![Untitled](../img/grupos-de-chat/Untitled.png)

* **Nome:**
  Deve ser informado o nome do grupo que será visível a todos os usuários do grupo.
* **Apenas ADMs. enviam mensagens:**
  Desabilita a permissão de demais membros para poderem responder no chat, sendo permitido apenas aos administradores.
* **Avatares:**
  Permite a seleção de um avatar para exibição no grupo.
* **Administradores:**
  Permite selecionar um ou mais usuários como administradores ao arrastar o usuário do campo Usuários para Selecionados.
* **Membros:**
  Permite selecionar um ou mais usuários como membros ao arrastar o usuário do campo Usuários para Selecionados.

---

## Horários de Atendimento

**URL:** https://wiki.native-infinity.com.br/horario-de-atendimento/

# Horários de Atendimento

Possibilita criar diferentes faixas de horários para as mais variadas aplicações, customizando-as de forma a atender inclusive exclusividades de setores, como por exemplo, direcionar uma chamada para determinada opção em um sábado, porém para as demais enviar para um áudio personalizado. Também, permite criar situações como turno de trabalho e feriados.

Vídeo Aula

## Menu Horários de Atendimento

![Untitled](../img/horarios-de-atendimento/Untitled0.png)

## Horário de Atendimento

Em horário de Atendimento é possível ajustar o horário em que uma URA ou fila receberão ligações, como por exemplo, o horário comercial em que a empresa atende.

![Untitled](../img/horarios-de-atendimento/Untitled.png)

* **Novo Horário de atendimento:**
  Possibilita a criação de um horário de atendimento
* **Nome:**
  Deve ser inserido o nome do horário de atendimento
* **Horário:**
  Define qual ou quais os horários de expediente.
* **Início:**
  Define a hora de início.
* **Fim:**
  Define a hora final
* **Dias da semana:**
  Define os dias em que o horário estipulado é valido.
* **Adicionar Horário:**
  Insere o horário na regra e abre um novo campo para preenchimento de horário.
* **Mensagem fora de expediente:**
  Áudio executado fora da faixa de horário determinada como expediente acima. Para importação, este áudio deve estar obrigatoriamente nos formatos “.wav” ou “.mp3”. Para realizar a importação, deve-se clicar em “Escolher Arquivo...”, encontra-lo no diretório de origem e clicar em “Abrir”. Caso não seja selecionado nenhum áudio, o Native Infinity não irá executar nenhuma mensagem de voz, apenas prosseguir com o encaminhamento da ligação definido nas demais opções.
* **Após a mensagem:**
  Define a ação executada após o fim do áudio.

  + **Não Desviar / Desligar:** Derruba a chamada ao fim da execução do áudio.
  + **Ramal:** Desvia as ligações para um ramal selecionado no campo ao lado direito.
  + **Fila:** Desvia as ligações para uma fila selecionada no campo ao lado direito.
  + **Telefone:** Desvia as ligações para um telefone descrito no campo ao lado direito, como por exemplo um celular (deve-se preencher o campo da mesma maneira que os ramais utilizam para discar).
  + **URA:** Desvia as ligações para uma URA selecionada no campo ao lado direito.
  + **Regra Customizada:** Executa regra customizada selecionada no campo ao lado direito.
* **Filas:**
  Seleção de filas na qual a regra do horário de atendimento será aplicada.
* **URAs:**
  Seleção de URAs na qual a regra do horário de atendimento será aplicada.

## Turno de Trabalho

Tem como objetivo estipular um horário de trabalho diferente do horário de atendimento, podendo cadastrar um horário limite em que será possível vincular para um ou mais usuários, na qual os atendentes poderão ou não realizar login no sistema.

![Untitled](../img/horarios-de-atendimento/Untitled1.png)

* **Novo Turno de Trabalho:**
  Permite criar um novo turno de trabalho.
* **Nome:**
  Deve ser inserido o nome identificador do turno de trabalho
* **Início:**
  Define a hora de início.
* **Fim:**
  Define a hora final.
* **Dias da semana:**
  Define os dias em que o horário estipulado é valido.
* **Tolerância:**
  Permite que o usuário continue logado, caso permaneça após o horário estipulado. Após este horário o usuário não conseguirá realizar novas ligações ou acessar o sistema.

## Eventos / Feriados

Permite cadastrar eventos ou feriados, que irão sobrescreve os horários de atendimento, ou seja, irá executar de qualquer maneira o programado pelo evento ou feriado cadastrado.

![Untitled](../img/horarios-de-atendimento/Untitled2.png)

* **Novo Evento:**
  Permite criar um novo evento ou feriado.
* **Nome:**
  Deve ser inserido o nome identificado do evento.
* **Início:**
  Define a hora de início e também o horário de inicio.
* **Fim:**
  Define a hora final e também o horário de fim.
* **Mensagem:**
  Áudio executado fora da faixa de horário determinada como expediente acima. Para importação, este áudio também deve estar obrigatoriamente nos formatos “.wav” ou “.mp3”. Para realizar a importação, deve-se clicar em “Escolher Arquivo...”, encontra-lo no diretório de origem e clicar em “Abrir”. Caso não seja selecionado nenhum áudio, o Native Infinity não irá executar nenhuma mensagem de voz, apenas prosseguir com o encaminhamento da ligação definido nas demais opções.
* **Após Mensagem:**
  Define a ação executada após o fim do áudio assim como demonstrado em horário de atendimento.
* **Filas:**
  Seleção de filas na qual a regra do horário de atendimento será aplicada.
* **URAs:**
  Seleção de URAs na qual a regra do horário de atendimento será aplicada.

Observação

As regras de horários estipulam o horário de funcionamento das filas ou URAs vinculadas, ou seja, dentro do horário estipulado o encaminhamento das chamadas terão seu fluxo normal, após o horário estipulado é quando deverá ocorrer o desvio das ligações.

---

## Monitoria

**URL:** https://wiki.native-infinity.com.br/monitoria

# Monitoria

Este menu visa possibilitar que o atendimento realizado pelos atendentes seja avaliado pelo seu supervisor, com base na criação de formulários que possuem uma série de requisitos. Após as avaliações também será possível extrair relatórios que para mensurar os atendimentos dos atendentes.

Vídeo Aula

## Menu Monitoria

![Untitled](../img/monitoria/Untitled0.png)

## Formulários

Em formulário pode se criar diferentes agrupamento de requisitos que poderão ser vinculadas a filas ou companhas do discador. Para cada formulário será possível selecionar e ordenar os requisitos criados, também permite adicionar uma nota para os requisitos que forem cumpridos, uma nota para quando não forem cumpridos, e uma porcentagem do plano de ação com base no que o atendente deve obter dentre toda a avaliação para aprovar em um requisito específico.

![Untitled](../img/monitoria/Untitled.png)

* **Novo Formulário:**
  Permite a criação de um novo formulário.
* **Nome:**
  Deve ser inserido o nome do formulário em questão.
* **Descrição:**
  Possibilita adicionar uma breve descrição sobre o formulário.
* **Filas:**
  Permite selecionar quais filas serão vinculadas a este formulário.
* **Campanhas:**
  Permite selecionar quais campanhas serão vinculadas a este formulário.
* **Requisitos:**
  É onde pode ser definido a ordenação dos requisitos, assim como a classificação das notas para cada requisito.

  + **Pontos - Atendeu:** Nota dada caso o atendente cumpra o requisito.
  + **Pontos - Não Atendeu:** Nota dada caso o atendente não tenha cumprido o requisito.
  + **% Plano de ação:** Porcentagem mínima que o atendente precisa alcançar para obter aprovação no requisito específico.

## Requisitos

Requisitos podem ser vistas como tarefas ou pontos de atenção que um atendente precisará cumprir para ser avaliado. Ao criar um requisito será possível descrever um plano de ação e vincular este a um formulário.

![Untitled](../img/monitoria/Untitled1.png)

* **Novo Requisito:**
  Permite criar um novo requisito.
* **Nome:**
  Deve ser inserido o nome do requisito.
* **Plano de ação:**
  Permite descrever os objetivos do requisito.
* **Passos:**
  Campo onde pode ser escolhido a ordenação do requisito
* **Ativado:**
  Ao ativar torna o requisito visível para poder ser vinculado a um formulário.

## Avaliação

Em avaliação é onde o monitor responsável deverá realizar de forma manual a avaliação das ligações realizadas pelos atendentes conforme filas de atendimento ou campanhas. Será possível também realizar uma busca com base na data, por agente, ou ainda pelo protocolo da ligação.

![Untitled](../img/monitoria/Untitled2.png)

* **Inicio:**
  Data de início da busca.
* **Fim:**
  Data final da busca.
* **Agente:**
  Permite buscar por um atendente que tenha realizado um atendimento.
* **Protocolo:**
  Permite buscar pelo protocolo de uma ligação.
* **Buscar Ligações:**

---

sidebar\_position: 1
sidebar\_label: Sobre o Infinity
sidebar\_class\_name: blue

---

Após preencher os campos acima, ao clicar em buscar serão trazidas as informações no período selecionado.

![Untitled](../img/monitoria/Untitled3.png)

Após realizar uma busca serão trazidas todos os atendentes que tenham realizado ligações dentro do período selecionado. Ao lado do nome do atendente serão exibidos o **total de ligações**, o **total de avaliações** e o **percentual de atendimento** obtido conforme ligações avaliadas.

Ao clicar em um atendente serão mostrados todas as ligações deste mesmo atendente, sendo possível clicar na ligação desejada para realizar a avaliação.

![Untitled](../img/monitoria/Untitled4.png)

No momento da avaliação serão mostrados todos os requisitos, dando oportunidade ao avaliador para ouvir a ligação e avaliar requisito por requisito, também permite justificar a avaliação dada e colocar uma observação para o atendimento.

* **Passo:**
  Posição do requisito.
* **Quesito:**
  Quesito a ser avaliado
* **Atendeu:**
  Deve ser clicado caso o atendente tenha cumprido o requisito.
* **Não Atendeu:**
  Deve ser clicado caso o atendente não tenha cumprido o requisito.
* **Justificativa:**
  Permite ao avaliador justificar a escolha realizada na avaliação para cada requisito pontuado.

## Relatório Consolidado (Plano de Ação)

Em relatório consolidado pode-se extrair um apanhado geral das avaliações realizadas por requisito, sendo possível verificar em quais requisitos o atendente atingiu maior porcentagem.

![Untitled](../img/monitoria/Untitled5.png)

* **Inicio:**
  Data de início da busca.
* **Fim:**
  Data final da busca.
* **Formulário:**
  Permite buscar pelo formulário criado.
* **Agente:**
  Permite buscar por um atendente que tenha realizado um atendimento.
* **Buscar Ligações:**
  Após preencher os campos acima, ao clicar em buscar serão trazidas as informações no período selecionado.

![Untitled](../img/monitoria/Untitled6.png)

* **Data:**
  Data da busca realizada.
* **Agente:**
  Agente que realizou a pesquisa durante o período pesquisado.
* **Formulário:**
  Formulário pesquisado.
* **Passo:**
  Passo do requisito avaliado.
* **Requisito:**
  Requisito avaliado.
* **% Atingido:**
  Porcentagem obtida em uma requisição com base em todas as ligações avaliadas durante o período pesquisado.
* **Plano de ação:**
  Caso a porcentagem do requisito avaliado esteja abaixo do valor mínimo estipulado no formulário, será exibido aqui o plano de ação.
* **Lig. Monitoradas:**
  Quantidade de ligações monitoradas no período buscado.

## Relatório Detalhado

Em Relatório Detalhado é disponibilizado um detalhado de todas as avaliações realizadas, sendo possível buscar pelas ligações avaliadas e verificar a distribuição dos pontos dados aos requisitos.

![Untitled](../img/monitoria/Untitled7.png)

* **Inicio:**
  Data de início da busca.
* **Fim:**
  Data final da busca.
* **Formulário:**
  Permite buscar pelo formulário criado.
* **Agente:**
  Permite buscar por um atendente que tenha realizado um atendimento.
* **Protocolo:**
  Permite buscar pelo protocolo de uma ligação.
* **Buscar Ligações:**
  Após preencher os campos acima, ao clicar em buscar serão trazidas as informações no período selecionado.
* **Exportar CSV:**
  Permite exportar para um arquivo .CSV que posteriormente pode ser aberto pelo Excel ou outros softwares similares.

---

## Músicas de Espera

**URL:** https://wiki.native-infinity.com.br/musicas-de-espera/

# Músicas de Espera

Em música de espera pode-se criar diferentes agrupamentos de músicas que tocarão enquanto o cliente aguarda na fila de atendimento.

## Menu Músicas de Espera

![Untitled](../img/musicas-de-espera/Untitled.png)

* **Nova Música de Espera:**
  Permite a criação de um novo agrupamento de músicas.
* **Nome:**
  Campo onde deve ser inserido o nome do agrupamento de músicas de Espera.
* **Descrição:**
  Possibilita criar uma descrição para o agrupamento de músicas.
* **Áudio:**
  Botão para realizar o upload das músicas de espera. Para importação, este áudio deve estar obrigatoriamente nos formatos “.wav” ou “.mp3”. Para realizar a importação, deve-se clicar em “Escolher Arquivo...”, encontrá-lo no diretório de origem e clicar em “Abrir”.

É possível fazer o upload de mais de uma música para cada grupo.

* **Arquivos carregados:**
  Exibe a lista músicas inseridas, sendo possível ouvir o áudio ou remover.

---

## Painel de Ramais

**URL:** https://wiki.native-infinity.com.br/painel-de-ramais/

# Painel de Ramais

O painel de ramais é um menu interessante, que pode ser atrelado para usuários que desempenham o papel de atender e destinar ligações a outros usuários, como uma telefonista. Neste painel, é possível acompanhar os usuários que realizaram login e, o fluxo de ligações destes em tempo real, havendo ainda possibilidade de transferir ligações por meio do próprio painel.

Video Aula

DICA

Quer entender melhor como utilizar o painel de atendimento para telefonistas? **[Clique aqui](./na-pratica/na-painel-de-ramais)** para acessar nosso conteúdo em vídeo que demonstra a utilização do painel de atendimento para telefonistas na prática.

## Menu Painel de Ramais

![Untitled](../img/painel-de-ramais/Untitled.png)

* **Ramais:**
  Nesta tela serão exibidas todos os ramais cadastrados, sendo possível escolher entre exibir apenas os que estão ativos ou até mesmo os inativos.

  + **Ocultar Inativos:** Ao desativar serão mostrados todos os usuários, tanto inativos, quanto os que estão ativos (que realizaram login).
  + **Procurar:** Permite procurar os usuários por nome ou pelo ramal.
  + **Engrenagem:** Permite ajustar o formato de ordenação dos cards, pelo nome do usuário ou por ramal. Também permite selecionar os centros de custos que serão exibidos caso tenha os configurado.
* **Abas:**
  Já nas abas é possível alternar entre os centro de custos. Caso não possua nenhuma visível, possivelmente é por não possuir nenhum centro de custo criado e que contenha ramais ou usuários atribuídos a ele.

![Untitled](../img/painel-de-ramais/Untitled1.png)

* **Cards:**
  Nos Cards é possível realizar o acompanhamento das ligações que estão em andamento, tendo a possibilidade de realizar algumas interações como tender a ligação e realizar transferências. Para atender basta clicar no ícone do telefone verde, para transferir basta clicar no ícone das setas em laranja (Para transferir serão oferecidas duas opções, transferência direta ou assistida).
  Abaixo na imagem é possível ver mais sobre os diferentes status que são exibidos para os usuários e ramais.

![Untitled](../img/painel-de-ramais/Untitled2.png)

* **Filas:**
  No lado direito serão mostradas as filas nas quais o usuário com acesso ao painel de ramais está vinculado, possibilitando ao usuário escolher qual ligações irá atender antes, perante todas as que estão aguardando atendimento na fila.

![Untitled](../img/painel-de-ramais/Untitled3.png)

---

## Plano de Discagem

**URL:** https://wiki.native-infinity.com.br/plano-de-discagem/

# Plano de Discagem

Em plano de discagem, caso você já possua um ou mais troncos configurados, será possível criar as rotas de entrada e saída, podendo então, destinar ligações que estão chegando pelo tronco configurado, para um destino como uma URA, Fila de atendimento, ou ramal. É possível também estipular diferentes regras para as rotas de saída, escolhendo a forma de como os números deverão ser discados e posteriormente tratados para serem destinados à operadora, com possibilidade de destinar as ligações a troncos diferentes, conforme necessidade. Para configurar estas rotas são utilizadas máscaras. Ainda em plano de discagem também é possível criar rotas internas ou realizar a configuração de um Call back.

OBSERVAÇÃO

Menus relacionados a configuração do plano de discagem:

* **[Troncos](../troncos/)**
* **[URAS](../uras/)**
* **[Filas](../filas/)**
* **[Ramais](../ramais/)**

Vídeo Aula

## Menu Plano de discagem

![Untitled](../img/plano-de-discagem/plano-de-discagem.png)

## Call Back

O call back é o ato de retornar a ligação do cliente que inicialmente entrou em contato com a sua central de atendimento. Desta forma no menu Callback podemos criá-lo para que posteriormente possa ser vinculado a uma rota de entrada conforme vimos a pouco.

![Untitled](../img/plano-de-discagem/Untitled.png)

* **Novo CallBack:**
  Permite criar um novo CallBack.
* **Nome:**
  Nome que será exibido nas telas onde será possível selecionar o Callback.
* **Áudio**:
  Áudio que tocará para quem ligar para o Callback configurado. Para colocar o áudio Pedimos que o arquivo não contenha caracteres especiais ou espaços, após inserir clique em upload.
* **Perfil de Retorno:**
  Possibilita selecionar por quais perfis de rotas de saída a ligação de retorno será realizada. Para este campo será necessário previamente ter um perfil configurado no Menu Ramais e Perfis.
* **Tipo do CallBack:**
  Permite escolher entre “Callback de Fila” que será usado para retornar as ligações de filas que não foram atendidas, ou “CallBack de Entrada” que pode ser vinculado a uma rota de entrada para um número específico. Caso seja selecionado Callback de entrada ainda é possível selecionar:
* **Filtro do Callback:**
  É onde será possível escolher se deseja realizar a função de Callback para todos os telefones, ou apenas para celulares.
* **Entrada do retorno:**
  Permite selecionar a origem do retorno, se a ligação deverá ser retornado por uma fila, URA ou Ramal.

## Rotas de Entrada

Permite criar diferentes regras para escolher a forma de como os números deverão ser distribuídos dentro de seu PABX, sendo possível encaminhar as ligações para URAs, ramais, filas, callback, outros telefones, rotas internas e rotas de saídas.

![Untitled](../img/plano-de-discagem/Untitled1.png)

* **Nova Rota de Entrada:**

  Para criar uma nova rota de entrada, ao acessar o menu Rotas de entrada, clique Nova Rota de entrada.
* **Nome:**

  Identificador da rota de entrada, podendo ser adicionado alguma descrição logo abaixo.
* **Troncos:**
  Permite selecionar a qual tronco está rota de entrada se refere.
* **Blacklists:**
  Caso tenha uma blacklist configurada previamente, é possível selecioná-la aqui, bloqueando a entrada de ligações indesejadas para os números listados nesta blacklist.
* **Máscara:**
  É onde será tratado e organizado a entrada de ligações, criando diferentes máscaras, com objetivo de criar diferentes rotas para diferentes destinos como URAs, filas ou ramais e etc... Neste caso, como as ligações entram podem variar de acordo com seu equipamento ou operadora
* **Remover:**
  Remove os dígitos à esquerda do número digitado.
* **Adicionar:**
  Adiciona os números à esquerda do número digitado.
* **Tipo de Destino:**
  Permite selecionar o tipo de destino, como CallBack, fila, ramal, URA entre outras opções de destino.
* **Destino:**
  Após selecionar um tipo de destino é possível adicionar o destino.
* Caso queria criar outra entrada, é possível clicar na seta de mais.

## Rotas Internas

Em rotas internas permite-se criar regras com números e máscaras, que quando digitado internamente, destinarão para outro local especificado.

![Untitled](../img/plano-de-discagem/Untitled2.png)

* **Nova Rota:**
  Permite a criação de uma nova rota interna.
* **Nome:**
  Deve ser inserido o nome identificador da rota.
* **Máscaras:**
  É onde deve se estipular um número ou máscaras que será destinado a um ramal, fila, URA e etc…
* **Tipo de Destino:**
  Permite selecionar o tipo de destino, como Fila, Ramal, URA ou telefone.
* **Destino:**
  Após selecionar um tipo de destino é possível adicionar o destino.
* Caso queria criar outra entrada, é possível clicar na seta de mais.

## Rotas de Saída

Permite criar diferentes regras para escolher a forma de como os números deverão ser discados e posteriormente tratados para serem destinados a operadora.

![Untitled](../img/plano-de-discagem/Untitled3.png)

* **Nova Rota de Saída:**
  Permite a criação de uma nova rota de saída.
* **Nome:**
  Deve ser inserido o nome identificador da rota de saída.
* **Descrição:**
  Possibilita inserir uma breve descrição das regras inseridas em uma rota de saída.
* **Blacklists:**
  Caso tenha uma blacklist configurada previamente, é possível seleciona-la aqui, bloqueando a saída de ligações para os números listados nesta blacklist.
* **Habilitar:**
  Pode se habilitar ou desabilitar uma regra criada. Quando habilitada a regra estará em uso, já quando desabilitada a regra permanecerá visível, mas os parâmetros informados não estarão em uso, podendo ser habilitado novamente posteriormente.
* **Cód. Ligação externa:**
  Habilita-se o código para realizar ligações externas, código este que pode ser definido no Menu Cód. Funcionalidades, código como o “0” antes da discagem do número desejado.
* **Tipo de ligação/ Máscara:**
  Permite definir o tipo de ligação, neste campo por sua vez, já nos traz uma série de modelos de máscara pronta que podem ser utilizadas.
* **Remover:**
  Tem a finalidade de tratar o número para ser destinado à operadora, aqui é possível estipular a quantia de números que deverão ser removidos à esquerda do número conforme o tipo de máscara.
* **Adicionar:**
  Pode ser adicionado um ou mais números à esquerda do número digitado.
* **Exemplo de rota de saída com tratamento:**

![Untitled](../img/plano-de-discagem/Untitled4.png)

Observação

Conforme neste exemplo, ao digitar um número para Celular com **DDD + número (099 9 9999-999)**, será **removido** o primeiro digito **(0)** e **acrescido** **(015)**, deixando o número como **(015 99 9 9999-9999)**

* **Tronco:**
  Campo onde deve ser informado para qual tronco esta ligação deverá ser destinada.
* **Transbordo:**
  Em transbordo é permitido configurar uma nova rota de saída, utilizando outro tronco para um mesmo tipo de ligação, para caso tenha algum problema com o tronco principal.

![Untitled](../img/plano-de-discagem/Untitled5.png)

* **Condições:**
  Definimos um mais tipos de falha podendo ser:
* **ocupado:** Para quando o tronco primário não consegue entregar a ligação tendo o retorno de ocupado.
* **Falhas:** Para quando a ligação não é gerada devido a problemas com o tronco.
* **Limite do tronco:** Para quando o tronco já não possui canais disponíveis, possivelmente devido a um número alto de ligações sendo realizadas.
* **Remover:**
  Remove os dígitos a esquerda do número digitado.
* **Adicionar:**
  Adiciona os números à esquerda do número digitado.
* **Tronco de Transbordo:**
  Local onde deve ser informado o outro tronco para onde a ligação deverá ser destinada, caso o primeiro apresente algum problema.
* Caso queira adicionar mais rotas basta clicar no sinal de Mais.

## Máscaras

Ao preencher o campo de máscaras dentro de rotas de entrada, saída e internas é possível utilizar alguns caracteres curingas que serão interpretados pelo Native Infinity e que podem ser utilizados de formas combinadas. Dentre as opções temos:

| MÁSCARA | SIGNIFICADO |
| --- | --- |
| X | Dígitos entre 0-9 |
| Z | Dígitos entre 1-9 |
| N | Dígitos entre 2-9 |
| [5-8] | Dígitos 5, 6, 7 e 8 |
| [15-9] | Dígitos 1, 5, 6, 7, 8 e 9 |
| . (ponto) | Qualquer valor numérico ou caractere |

---

## Ramais

**URL:** https://wiki.native-infinity.com.br/ramais/

# Ramais

Através do menu Ramais você terá a opção de configurar novos ramais, suas funcionalidades, acessos e permissões de discagem. É possível editar ramais já configurados, podendo alterar senha, remover ou adicionar permissões e funcionalidades.

Vídeo Aula

## Menu Ramais

![Untitled](../img/ramais/Untitled.png)

## Categorias

Através das categorias você vai configurar permissões para uso de funcionalidades, gravação de chamadas e transbordo dos ramais.

![Untitled](../img/ramais/Untitled1.png)

* **Funcionalidades:**
  Em funcionalidades você pode configurar se o ramal vai utilizar caixa postal, siga-me, cadeado, passwordcall ou ativar a opção de nat.

  + **NAT**: Opção de nat deve ser ativa em casos onde o servidor está hospedado em nuvem ou o ramal esteja passando por nat em sua conexão.
  + **Voicemail:** Ao habilitar esta opção será disponibilizado para o ramal a função de correio de voz, que será informado a quem ligar para o ramal sempre que o mesmo estiver offline.
  + **Cadeado:** Habilita a opção de bloqueio para os ramais. Quando estiver ativo diretamente no ramal impedirá este de realizar ligações.
  + **Siga-me:** Ao habilitar esta opção será disponibilizado para o ramal a função de siga-me, para que o ramal possa destinar a ligação para outro ramal desejado.
  + **PasswordCall:** Ao habilitar esta opção será bloqueado a funcionalidade de realizar ligações, sendo possível ligar somente após digitar uma senha.
* **Gravar ligações:**
  Permite configurar se o ramal deverá gravar ligações, caso opte por gravar é possível escolher quais ligações, podendo gravar todas as ligações ou apenas ligações externas.
* **Ligações simultâneas:**

  Em ligações simultâneas, caso liberada para o ramal, mesmo que esteja em chamada, outras ligações devem entrar em simultâneo para atendimento.
* **Alterar status:**

  Ramal vai poder alterar o seu status entre online, ausente e ocupado
* **Forçar callerid (BINA):**

  Configuração para envio de bina em ligações realizadas, com isso podemos enviar o número de identificação enviado para o destino. A funcionalidade depende de liberação da operadora.
* **Timeout:**

  Tempo em que chamadas recebidas ficam chamando no ramal até cair como ocupado em casos de não atendimento.
* **Permissão por horário:**

  Você pode configurar os horários em que o ramal pode realizar ligações através da opção permissão por horário. Caso o ramal tentar realizar uma chamada fora do horário o servidor não vai permitir.

## Grupos

Durante a criação de um ramal podemos vincular o mesmo em um grupo. O grupo é utilizado para a funcionalidade de captura de ligações do grupo. Para saber mais sobre a funcionalidade você pode acessar código de funcionalidades.

![Untitled](../img/ramais/Untitled2.png)

* **Nome:**
  Nome do grupo de ramais.
* **Descrição:**
  Descrição do grupo.

## Perfis

Um perfil de ligação define quais tipos de chamadas um ramal poderá realizar e quais operadoras serão utilizadas caso tenha mais de uma operadora. A configuração do perfil de ligações está relacionada diretamente na configuração de plano de discagem.

![Untitled](../img/ramais/Untitled3.png)

* **Nome:**
  Nome do perfil de ligações utilizado.
* **Descrição:**

  Descrição do perfil, utilizado para descrever quais rotas são utilizadas no perfil em questão ou algum aviso.
* **Rotas de saída:**

  Em rotas de saída você vai definir quais saídas de chamadas serão utilizadas, podendo configurar regras para ligações locais, ligações de longa distância, ligações de emergência, ligações internacionais ou demais regras configuradas em seu plano de discagem.

## Ramais

Através do menu Ramais pode ser criado um novo ramal, editar ramais já criados ou excluir um ramal.
Para a criação de um novo ramal será necessário ter configurado uma categoria. O perfil de ligações caso não tenha nenhum o ramal vai conseguir ligar apenas para outros ramais do servidor, o grupo também não é obrigatório. Categoria de ramal é um ponto abordado anteriormente em categorias.

![Untitled](../img/ramais/Untitled4.png)

* **Ramal:**
  Número do ramal.
* **Senha:**
  Senha do ramal para registro em telefones IP ou softphones.
* **Nome:**

  Nome do ramal é utilizado para visualização de relatórios, agenda de contatos e painel de ramais.
* **Centro de Custos:**

  O centro de custos é utilizado para facilitar buscas através dos relatórios de PABX. Você pode compreender melhor o centro de custo consultando as explicações sobre o Centro de custo.
* **Grupos:**

  Grupo em que o ramal será vinculado. O grupo é utilizado para a funcionalidade de captura de ligações em grupo. Você pode compreender melhor todas as funcionalidades consultando as explicações sobre o código de funcionalidades.
* **Perfil:**

  Perfil de ligações do ramal, onde é definido quais tipos de ligações e rotas o ramal vai utilizar.
* **Categoria:**
  Definição da categoria do ramal e funcionalidades que ele poderá utilizar.
* **Provisionamento:**

  O provisionamento é utilizado para facilitar a configuração de telefones IP, sendo necessário confirmar a compatibilidade da marca e modelo. Através do provisionamento você vai sincronizar as configurações do ramal e agenda do ramal em seu telefone IP.
* **Marcas compatíveis:**

  + khomp
  + grandstream
  + intelbras

  **URL que deve ser utilizada em seu aparelho IP para configurar o provisionamento:** `https://seudominio/provisioning/marca/`

Observação

É necessário verificar a compatibilidade do native com o modelo de seu telefone IP.

* **CallCenter:**

  A opção de call center é vinculada ao módulo de call center do native infinity. Deve ser ativa a opção call center apenas em ramais utilizados por agentes de call center.
* **webRTC:**

  O webRTC é um padrão de comunicação e pode não ser compatível com alguns modelos de telefones IP ou softphones.

  A opção de webRTC deve ser utilizada apenas em ramais com o uso de nosso softphone web ou softphone desktop e mobile da native. Aparelhos de telefone IP, dispositivos ATA, gateways FXS ou modelos de softphone de terceiros devem ter o webRTC desativado.
* **Ocultar na agenda:**

  Deixa o ramal oculto na agenda de ramais.

DICA

**Ficou na dúvida sobre como utilizar os ramais?**

Temos vídeos práticos demonstrando a utilização de ramais administrativos e ramais de Call Center.

Para saber mais sobre ramais administrativos, **[clique aqui](./na-pratica/na-ramais-administrativos)**

Para saber mais sobre atendentes de Call Center, **[clique aqui](./na-pratica/na-atendente-de-call-center)**

---

## Regras Customizadas

**URL:** https://wiki.native-infinity.com.br/regras-customizadas/

# Regras Customizadas

Regras customizadas são utilizadas para aplicar alguma verificação ou tratativa personalizada para o atendimento de uma fila. Pode ser configurado uma regra customizada para ser executada antes ou depois da fila, aplicando alguma condição ou até mesmo reproduzir uma mensagem informativa.

Através do menu de regras customizadas podemos configurar a avaliação de atendimento de uma fila.

DICA

Para adicionar uma regra customizada para execução em suas filas de atendimento deve ser realizar a configuração através do menu **[Filas](../filas/)**

Vídeo Aula

## Menu Regras Customizadas

![Untitled](../img/regras-customizadas/regras-customizadas1.png)

## Regras Customizadas

Uma regra customizada segue a mesma dinâmica de criação de uma URA, onde temos algumas opções de comandos a serem utilizados. Podemos utilizar condições e validações de forma geral, condições com horário ou aplicar dinâmicas customizadas para a fila em questão.

Um exemplo que podemos utilizar é o uso de uma condição com horário, podendo definir uma data e horário para direcionar as chamadas de uma fila ou executar um áudio informativo.

Após configurar uma regra customizada, deve ser feito o acesso ao menu de filas e adicionar sua regra para a fila desejada. Uma regra customizada fica disponível para todas as filas, sendo necessário
adicionar de forma manual para cada fila.

![Untitled](../img/regras-customizadas/regras-customizadas2.png)

DICA

Lista com os comandos para uso em regras customizadas:

| Comando | Informações sobre o comando |
| --- | --- |
| Chamar fila | Chama uma fila para encaminhamento da ligação |
| Condição | Realiza uma verificação, caso validado é possível vincular a outro comando no campo então |
| Condição com horário | Realiza uma verificação com horário, caso validado, é possível vincular a outro comando no campo então |
| Desliga | Desliga a ligação |
| Desvio | Desvia a ligação para uma label ou URA |
| Discar | Permite discar para um telefone, ramal ou variável |
| Setar variável | Permite configurar uma variável |
| Tocar áudio | Permite tocar um áudio |
| Tocar áudio e Capturar Dígitos | Permite tocar um áudio e aguardar a digitação para inserção em uma variável |
| Personalizado | Permite a criação de comandos personalizados |
| Definição | Campo onde deverá ser inserido as condições com que se deseja trabalhar, sendo possível combiná-las conforme necessidade |
| Label | Campo onde pode ser inserido um nome de identificação, desta forma é possível referenciar um comando em outro |
| Protocolo de ligação | Gera um número de protocolo para a ligação utilizando o formato de protocolo configurado na aba de sistema |
| Enviar SMS | Realiza o envio de SMS utilizando um número de telefone como destino e corpo de mensagem configurável |

## Avaliações de atendimento

Avaliação de atendimento é utilizada em filas para medir a qualidade de atendimento dos ramais, onde temos a opção de executar uma ou mais avaliações ao final da ligação.

Uma avaliação de atendimento após ser criada fica disponível para todas as filas, sendo necessário realizar o acesso ao menu de filas e adicionar sua avaliação para as filas desejadas.

![Untitled](../img/regras-customizadas/regras-customizadas3.png)

### Criando uma avaliação de atendimento

* **Nome:**
  Nome da avaliação de atendimento
* **Descrição:**
  Descrição da avaliação de atendimento. O campo descrição não é obrigatório, porém pode auxiliar na administração de seu servidor.
* **Áudio principal:**
  Áudio que será reproduzido para o cliente solicitando a nota de atendimento.
  Botão para realizar o upload do áudio. Para importação, este áudio deve estar obrigatoriamente nos formatos “.wav” ou “.mp3”. Para realizar a importação, deve-se clicar em “Escolher Arquivo...”, encontrá-lo no diretório de origem e clicar em “Abrir”.
* **Timeout(s):**
  Após finalizar a reprodução do áudio, o servidor vai aguardar por alguns segundos para interação de seu cliente. A duração da espera de dígitos é configurada no campo timeout(s).
  A configuração é feita em segundos, recomendamos a utilização de 4 a 6 segundos de espera por dígito.
* **Tentativas:**
  Caso o valor digitado estiver fora do intervalo definido no campo Nota ou o cliente não digitar nada, o servidor vai realizar novas tentativas para obter uma nota, conforme definido em sua configuração.

  Caso configure tentativas como 1 o servidor não vai solicitar a nota novamente.
* **Nota:**
  No campo nota você vai definir o limite de nota miníma e máxima como, por exemplo, notas de 1 até 5, 1 até 10 ou outros intervalos.
* **Áudio sucesso:**
  Arquivo que será executado após o cliente atribuir uma nota, onde podemos colocar um informativo agradecendo a colaboração do cliente.
* **Áudio erro:**
  Caso a nota digitada estiver fora do intervalo definido e seja necessária uma nova tentativa, vamos reproduzir o áudio de erro e após isso reproduzir o áudio principal novamente.

  Geralmente é informando que o valor informado está fora do esperado.

  Botão para realizar o upload do áudio. Para importação, este áudio deve estar obrigatoriamente nos formatos “.wav” ou “.mp3”. Para realizar a importação, deve-se clicar em “Escolher Arquivo...”, encontrá-lo no diretório de origem e clicar em “Abrir”.
* **Ao finalizar:**
  Aqui podemos definir uma tomada de decisão para o final da ligação, podendo ser desligar a chamada ou enviar para outra avaliação.

  A opção de enviar para outra avaliação é utilizada em casos onde é solicitado uma nota para o atendente, produto e organização.

  Botão para realizar o upload do áudio. Para importação, este áudio deve estar obrigatoriamente nos formatos “.wav” ou “.mp3”. Para realizar a importação, deve-se clicar em “Escolher Arquivo...”, encontrá-lo no diretório de origem e clicar em “Abrir”.

---

## Relatórios

**URL:** https://wiki.native-infinity.com.br/relatorios/

# Relatórios

O menu relatório contempla informações sobre as ligações do Native Infinity, trazendo informações relevantes de ligações e um completo histórico das chamadas que passaram pelo sistema.

Vídeo Aula

## Menu Relatórios

![Untitled](../img/relatorios/Untitled.png)

## Relatório de Ligações

Através do relatório de ligações, podemos buscar chamadas realizadas e recebidas através do servidor native infinity. Temos as seguintes opções de filtros para o relatório.

![Untitled](../img/relatorios/relatorios-ligacoes.png)

Observação

**Centros de Custo**

* Primeiramente, para podermos buscar em nossos relatórios existe ainda, a possibilidade de se cadastrar um centro de custo que posteriormente vinculado aos usuários, podem funcionar como mais um parâmetro para a busca de dados nos relatórios.
* Os centros de custo podem ser criado conforme setores da empresa, por exemplo.
* Para configuração de centros de custo você deve acessar o menu **[centro de Custos](../centro-de-custos/)**
* Caso esteja utilizando centros de custo como filtro, seu usário deve ter permissão de acesso, para isso você deve liberar o acesso ao centro de custos pelo menu **[usuários](../usuarios/)** na sessão módulos.

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Número de origem:**
  Número de quem realizou a ligação. Pode ser buscado parcialmente ou com o número por exato.
* **Número de destino:**
  Número de quem recebeu a ligação. Pode ser buscado parcialmente ou com o número por exato.
* **Opções de filtro E - OU:**
  Através das opções de E ou OU você consegue utilizar os filtros de número origem, ou número destino.

  Um exemplo de uso é filtrar ligações com origem ou destino de um telefone especifico.
* **Centro de Custo:**
  Possibilita a busca de acordo com o centro de custo.

  O centro de custo é configurado no ramal. É necessário que seu usuário tenha permissão de acesso ao centro de custo.
* **Domínio das ligações:**
  Possibilita escolher entre buscar por todas as ligações, por internas (entre ramais) ou externas.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

## Relatório de Chat

Em relatórios de chat é possível buscar por todas as conversas realizadas entre os usuários do Native Infinity. Para isso temos os seguintes filtros de busca:

![Untitled](../img/relatorios/relatorio-de-chat.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Tipo de Chat:**
  Se é de um usuário normal, ou de um pertencente a um grupo.
* **Centros de Custos:**
  Para pesquisar os usuários de um determinado centro de custos.
* **Usuários:**
  Para buscar pelos usuários.
* **Palavras chave:**
  Para buscar por alguma palavra dita na conversa.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as conversas.

## Relatórios Detalhado Chamadas Fora do Horário

Em relatórios detalhado chamadas fora do horário é possível buscar por ligações recebidas fora dos horários de atendimento que temos configurado no servidor.

![Untitled](../img/relatorios/relatorio-fora-horario.png)

Para o uso do relatório é necessário ter um horário de atendimento já configurado.

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Telefone:**
  Número de telefone que originou a ligação.
* **URAs:**
  URA onde a ligação foi recebida e verificado o seu horário de atendimento.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

---

## SMS

**URL:** https://wiki.native-infinity.com.br/sms/

# SMS

O menu SMS oferece a possibilidade de realizar o envio de mensagens de texto para celulares, com acompanhamento em tempo real das entregas e também por meio de relatórios. Possibilita ainda que usuário configure uma mensagem e realize um envio único, ou ainda subir uma lista contendo diversos números com mensagens adaptadas para cada número de destino.

Vídeo Aula

## Menu SMS

![Untitled](../img/sms/Untitled.png)

## Envio em lote

Permite criar novos templates para envio de mensagens em massa com base em um arquivo .CSV contendo os números de telefones e informações adicionais ou por inserção manual dos dados.

DICA

Para o envio de SMS em lote você deve utilizar o arquivo **sms\_example.csv**

É possível obter o arquivo **[clicando aqui](../download-files/sms_example.csv)** ou realizar o download através do menu de SMS do seu servidor infinity.

![Untitled](../img/sms/Untitled1.png)

* **Novo Template:**
  Permite a criação de um modelo de mensagens de texto que será utilizado para o envio em massa.
* **Nome:**
  Deve ser inserido o nome do template.
* **Descrição:**
  Permite descrever brevemente com o objetivo ou função do template.
* **Conteúdo:**
  Deve ser inserido a mensagem que será enviado a todos os usuários. Este campo permite alternar informações através das variáveis **#C1, #C2, #C3, #C4 e #C5**, com base nas colunas do arquivo **.CSV,** ou conforme o preenchimento manual caso opte por inserir os números de forma manual.
* **Exemplo de mensagem:**
  *OLÁ* *#C1.* *SEU EXAME DE* *#C2* *FOI AGENDADO P/* *#C3* *NO ENDEREÇO* *#C4**. ESPERAMOS VC, CHEGAR COM 20MIN DE ANTECEDÊNCIA!*
* **Exemplo de preenchimento do arquivo .CSV:**

![Untitled](../img/sms/Untitled2.png)

* **Exemplo de preenchimento manual:**

![Untitled](../img/sms/Untitled3.png)

* **Adicionar por:**
  Permite escolher a forma de como serão inseridos os dados para envio do SMS, se por CSV ou de forma manual.
* **Número:**
  Deve ser inserido o número de telefone para onde a mensagem deverá ser enviada.
* **Campos 1,2,3,4 e 5:**
  São os campos onde deverão ser inseridas as informações que deverão ser enviadas, respeitando os campos conforme a mensagem criada.
* **Adicionar:**
  Adiciona os dados inseridos para a lista de envio.

## Envio único

Permite realizar um envio de um único SMS.

![Untitled](../img/sms/Untitled4.png)

* **Conteúdo:**
  Deve ser inserido o conteúdo da mensagem a ser enviada.
* **Número:**
  Deve ser inserido o número de telefone para onde a mensagem deverá ser enviada.
* Após preencher os campos basta clicar no botão enviar

Observação

Ao criar uma mensagem para envio, é importante ter em mente que sempre que o conteúdo da mensagem ultrapassar 160 caracteres, haverá uma cobrança adicional por envio a cada 160 caracteres.

---

## Troncos

**URL:** https://wiki.native-infinity.com.br/troncos/

# Troncos

Os troncos são as interligações com as operadoras de telefonia ou até mesmo outras centrais telefônicas, que geralmente podem ser configuradas utilizando-se de gateways conversores ou conexões via rede de dados.

Vídeo Aula

## Menu Troncos

![47953ac4-c31d-4a1a-b68e-11eafe0355e9.png](../img/troncos/47953ac4-c31d-4a1a-b68e-11eafe0355e9.png)

* **Novo tronco:**
  Permite a criação e parametrização dos troncos.
* **Nome:**
  Nome do tronco.
* **Habilita:**
  Permite habilitar o entroncamento. Caso esteja desabilitado, as rotas vinculadas a este entroncamento também serão desativadas.
* **Protocolo:**

  Permite selecionar o tipo de protocolo utilizado.

  + **Khomp:** Seleciona-se para criação de troncos KHOMP da família EBS. Os equipamentos e o channel driver devem ser previamente instalados.
  + **SIP:** Selecionado para a criação de troncos SIP.
  + **Alocação dos canais:**
    Define-se o critério de alocação dos canais ao selecionar o protocolo khomp.
* **Seleção de canais:**
  Serão listados todos os canais disponíveis e reconhecidos pelo sistema. Deve-se selecionar os que pertencerão ao tronco.
* **Limite de chamadas:**
  É possível limitar uma quantidade de ligações geradas para o tronco.

### Protocolo SIP

Protocolo SIP (Protocolo de iniciação de sessão) é normalmente o protocolo mais utilizado em telefonia voip.

![3fe5eb32-2b1a-4c40-b0df-6912e0c1adea.png](../img/troncos/3fe5eb32-2b1a-4c40-b0df-6912e0c1adea.png)

* **Tipo de autenticação:**

  É possível selecionar o tipo de autenticação. Conforme o modelo utilizado pelo gateway ou operadora, sendo possível escolher entre três modelos.

  + **Recebe Registro:**
    Deve ser informado um usuário e uma senha para que futuramente possa ser configurado o equipamento de conexão. Esta modalidade é utilizada com maior frequência em gateways, onde o gateway ou operadora envia uma solicitação de registro com usuário e senha para o servidor do Native Infinity.
  + **Envia registro:**
    Marca-se quando o Native Infinity vai enviar solicitações de registro para a operadora ou gateway, desta forma o servidor Native Infinity envia as credenciais para o endereço IP do destino informado.
  + **Por IP:**
    Estabelece a comunicação do Native Infinity com o gateway ou operadora através do IP de origem e destino.
* **Monitorar Status (Qualify):**
  Permite monitorar o status do tronco através do envio pacote options entre origem e destino.
* **Bina:**
  Permite configurar o número que irá aparecer no momento em que realizar uma ligação através deste tronco. Para ser possível binar um número é necessário que sua operadora permita tal configuração.
* **Codecs:**
  Seleção de quatro codecs de comunicação respectivamente com a sua ordem de preferência. Por padrão os codecs mais utilizados são o Alaw e Ulaw.
* **Extras:**
  Permite que sejam adicionadas configurações extras, sendo uma opção raramente utilizada para atender alguma necessidade específica de fornecedores.

### Protocolo Khomp

Os Troncos Khomp são caracterizados por uma linha específica de produtos do fornecedor Khomp, a linha EBS, está por sua vez utiliza a comunicação de rede por intermédio de drivers proprietários

![483006e4-3bd3-43d8-9207-ce267128d00d.png](../img/troncos/483006e4-3bd3-43d8-9207-ce267128d00d.png)

* **Alocação dos canais**:

  Permite escolher o critério de alocação dos canais.

  + **Crescente:** Sempre tentará utilizar o primeiro canal disponível.
  + **Decrescente:** Sempre tentará utilizar o último canal disponível.
  + **Rotacionado Crescente:** Alternará de forma cíclica os canais iniciando dos menores para os maiores.
  + **Rotacionado Decrescente:** Alternará de forma cíclica os canais iniciando dos maiores para os menores.
  + **Canais:**

  Possibilita selecionar aqueles que farão parte deste tronco, sendo necessário 1 e podendo ser todos. A exibição ficará disponível conforme as placas dispostas no equipamento.

DICA

Caso seu tronco configurado não esteja registrado ou esteja mudo, existem algumas situações que devem ser validadas:

* Verifique se o servidor possui redirecionamento de portas.
* O protocolo SIP utiliza a porta 5060 UDP para registro.
* Para a passagem de áudio são utilizadas as portas RTP da 10.000 até a 20.000 UDP.

---

## URAs

**URL:** https://wiki.native-infinity.com.br/uras/

# URAs

URA é a abreviatura de Unidade de Resposta Audível. Trate-se de atendimento eletrônico para poderem ser feitas interações automáticas com o usuário do sistema.

Fica disponível a criação de um número indeterminado de URAS no Native Infinity, com as URAs existe a possibilidade de criar diversas regras para atender necessidades específicas para quando uma ligação entra por um tronco ou ainda quando transferido para um ramal de uma URA, como uma verificação, ou um menu informando opções como, por exemplo, uma URA que diz: Olá você ligou para a Native digite 1 para comercial, 2 Para financeiro ou 3 para suporte.

DICA

Após a configuração de um tronco, para que seja possível realizar e receber ligações através dele é necessário a configuração do seu **[plano de discagem](../plano-de-discagem/)**.

Vídeo Aula

## Menu URAS

![Untitled](../img/uras/menu-uras.png)

## URA Básica

Para podermos criar uma URA ao clicar em nova URA teremos o campo nome onde devemos inserir o nome identificador da URA, ao Lado o ramal da URA, e abaixo uma breve descrição sobre esta URA.

Logo abaixo, em modo de configuração teremos duas Opções de modos para se criar uma URA, o modo básica ou o modo avançado.

![Untitled](../img/uras/ura-basica.png)

DICA

Ao selecionar a modo básico possibilita-se a criação de uma ura rápida de acordo com alguns parâmetros:

* **Início:**
  Data de início da pesquisa no relatório.
* **Áudio principal:**
  Áudio que deve ser inserido com a pergunta que gostaria de realizar ao >cliente. Este áudio deve ser importado obrigatoriamente nos formatos “.wav” ou “.mp3”.
* **Timeout:**
  Tempo em segundos que irá ser aguardado para que o cliente digite, geralmente utiliza-se em média 4 segundos.
* **Tentativas:**
  Números de vezes em que a pergunta irá tocar novamente caso o cliente não digite nenhum valor. Ao final da última tentativa a ligação será destinada ao destino padrão, o caso este não seja especificado a ligação será encerrada.
* **Opção discar ramal:**
  Possibilita discar diretamente para um ramal.
* **Destino Padrão:**
  Aqui inserimos o número da opção para onde a ligação deverá ser encaminhada ao final das Tentativas caso nenhuma opção seja digitada na URA, ou ainda caso tenha sido digitado errado.
* **Áudio erro:**
  Áudio que deve ser inserido com uma mensagem de erro caso o cliente digite errado ou não digite nada. Ao digitar errado, a URA irá solicitar novamente, conforme o número de tentativas. Este áudio deve ser importado obrigatoriamente nos formatos “.wav” ou “.mp3”.
* **Opção:**
  Número que o cliente digitará, conforme áudio informado no início da ura.
* **Ação:**
  Ação que será realizada no momento em que for digitado a opção inserida no campo opções.

## URA Avançada

Ao selecionar a modo avançado permite-se a criação de uras mais complexas com maior variedade de ações do que a ura básica.

Para isto, temos os comandos onde deverão ser selecionados os comandos desejados e arrastados até o campo Definição. Ao ser selecionado o comando, novos campos irão aparecer para preenchimento conforme necessidade.

![Untitled](../img/uras/ura-avancada.png)

DICA

Lista com os comandos de URA no modo avançado:

| Comando | Informações sobre o comando |
| --- | --- |
| Atender | Para atender as ligações encaminhadas a URA |
| Chamar fila | Chama uma fila para encaminhamento da ligação |
| Condição | Realiza uma verificação, caso validado é possível vincular a outro comando no campo então |
| Condição com horário | Realiza uma verificação com horário, caso validado, é possível vincular a outro comando no campo então |
| Desliga | Desliga a ligação |
| Desvio | Desvia a ligação para uma label ou URA |
| Discar | Permite discar para um telefone, ramal ou variável |
| Setar variável | Permite configurar uma variável |
| Tocar áudio | Permite tocar um áudio |
| Tocar áudio e Capturar Dígitos | Permite tocar um áudio e aguardar a digitação para inserção em uma variável |
| Personalizado | Permite a criação de comandos personalizados |
| Definição | Campo onde deverá ser inserido as condições com que se deseja trabalhar, sendo possível combiná-las conforme necessidade |
| Label | Campo onde pode ser inserido um nome de identificação, desta forma é possível referenciar um comando em outro |
| Protocolo de ligação | Gera um número de protocolo para a ligação utilizando o formato de protocolo configurado na aba de sistema |
| Enviar SMS | Realiza o envio de SMS utilizando um número de telefone como destino e corpo de mensagem configurável |

---

## Usuários

**URL:** https://wiki.native-infinity.com.br/usuarios/

# Usuários

O menu usuário é responsável por gerenciar todas as credenciais e permissões de acessos ao Sistema Native Infinity. Neste menu podemos definir se um usuário será administrador, se será supervisor de Call Center, a quais filas poderá supervisionar e a quais menus terá acesso.

Vídeo Aula

## Menu Usuários

![Untitled](../img/usuarios/Untitled.png)

## Cadastro

Nesta aba é possível definir os dados de acesso do usuário.

![Untitled](../img/usuarios/Untitled1.png)

* **Novo usuário:**
  Permite a criação de novos usuários.
* **Nome:**
  Campo onde devemos inserir o nome do usuário. Abaixo temos o login do usuário,
* **login:**
  Campo onde deve ser informado usuário que será utilizado para realizar login na plataforma.
* **E-mail:**
  Para caso o usuário venha a se esquecer da senha, na tela principal é possível recuperar a senha clicando em um link que enviará um e-mail para o e-mail cadastrado neste campo.
* **Senha:**
  Senha para acesso à plataforma.
* **Redefinir senha:**
  Permite ativar a opção obrigatória para troca de senha. Ao realizar o login pela primeira vez com um usuário e senha, será solicitado para ser redefinida a senha.
* **Avatar:**
  Permite escolher um avatar para o usuário.

## Permissões

Nesta aba é onde informamos se um usuário será administrador, que caso seja terá a permissão para criar novos usuários. Caso possua o módulo de Call Center também será possível definir o tipo de usuário, caso possua também o módulo de Discador é possível estipular se o usuário terá acesso ao módulo e qual permissão dentro do módulo ele terá.

![Untitled](../img/usuarios/Untitled2.png)

* **Administrador:**
  Concede permissão para criar novos usuários.
* **CallCenter:**
  Define também se o usuário será um usuário de Call Center, sendo possível escolher entre:

  + **Supervisor:** Para caso o usuário seja aquele que irá supervisionar o atendimento das ligações dos atendentes de Call Center, tendo acesso às telas do Call Center.
  + **Atendimento imediato:** Atendimento sem necessidade de interação do usuário, atendimento automático.
  + **Atendimento padrão:** Atendimento normal, com interação do usuário.
  + **Não:** Configura como um usuário padrão, não pertencente ao Call Center.

## Módulos

Na aba módulo é define-se a quais módulos/menus o usuário terá acesso.

![Untitled](../img/usuarios/Untitled3.png)

* **Módulos:**

  Permite selecionar quais módulos/menus o usuário terá acesso.

## Configurações

Na Aba Configurações é permitido definir algumas configurações especificas do usuário como qual será o ramal atrelado, a tela de exibição, turno de trabalho e outras permissões.

![Untitled](../img/usuarios/Untitled4.png)

* **Ramal**:
  Possibilita vincular um ramal ao qual o usuário poderá utilizar.
* **Turno:**
  Possibilita vincular o usuário a um turno onde o usuário poderá realizar o login. Fora deste turno o mesmo não conseguirá realizar login.
* **Senha de funcionalidade:**
  Senha para a utilização de funcionalidades como voicemail e siga-me.

  Você pode verificar funcionalidades do sistema através do menu **[Código de funcionalidades](../codigo-de-funcionalidades/)**
* **Ausência Temporária:**
  Permite desabilitar o acesso do usuário, impedindo que o mesmo realize login, sendo necessário desabilitar para que o mesmo volte a ter acesso.
* **Desativa chat:**
  Desativa o softphone web, impossibilitando o usuário de utilizá-lo.
* **Desativa o softphone web**:
  Desativa o chat, impossibilitando o usuário de utilizá-lo.
* **Pagina Inicial:**
  Possibilita escolher a pagina inicial ao realizar login no Native Infinity.

---

## Vídeo Conferência

**URL:** https://wiki.native-infinity.com.br/video-conferencia/

# Vídeo Conferência

Em videoconferência pode se criar salas de videoconferência com data e horário, para que usuários internos ou externos realizem acesso por meio de um link gerado ao se criar a sala.

Vídeo Aula

### Criando uma sala de videoconferência

* **Campo ID:**
  O campo ID é criado automaticamente, criando um ID único para a sala de videoconferência. O ID é utilizando para o controle de acesso, sendo um processo automático da plataforma.
* **Nome:**
  Define o nome da sala de videoconferência.
* **Data de abertura:**
  Data para abrir a sala de videoconferência e liberar o acesso dos usuários.
* **Data de encerramento:**
  Data em que a sala será encerrada, após o horário de encerramento os usuários não conseguem acessar a sala.

  Usuários que estão na sala de videoconferência não são desconectados após a data de encerramento, apenas será bloqueado novos acessos.
* **Administrador:**
  O administrador da sala é a pessoa que terá permissão para realizar algumas configurações referente aos usuários. O administrador pode bloquear o acesso da sala, gravar a videoconferência ou forçar a saída de algum usuário.
* **Enviar E-mail:**
  Través do campo enviar e-mail é possível enviar um e-mail para os participantes, sendo possível acrescentar e-mails separados por ponto e virgula, assunto e conteúdo do e-mail com os assuntos desejados.
* **Gravar:**
  Opção para ativar a gravação da videoconferência. Para gravar a videoconferência, o administrador deve iniciar a gravação ao acessar a sala.

---

## Atendente de PABX

**URL:** https://wiki.native-infinity.com.br/atendente-de-pabx/

# Atendente de PABX

Para os usuários que possuírem um ramal atrelado, será possível acessar o Painel de Ramais. Neste painel serão disponibilizados alguns menus que permitirão ao usuário realizar e receber chamadas, ligar para outros usuários com um clique, verificar histórico, entre outras opções.

Vídeo Aula

DICA

Quer entender melhor como utilizar o ramal administrativo? **[Clique aqui](./na-pratica/na-ramais-administrativos)** para acessar nosso conteúdo em vídeo que demonstra a utilização dos ramais administrativos na prática.

## Menu Painel do Ramal

![Untitled](../img/atendente-de-pabx/Untitled.png)

## Softphone Web

Ao clicar no telefone branco no canto esquerdo inferior irá aparecer o softphone web, por ele será possível realizar e receber ligações. Caso o usuário possua um ramal atrelado, este deverá aparecer não canto da tela do softphone.

![Untitled](../img/atendente-de-pabx/Untitled1.png)

* **Botoes 1, 2, 3, e 4:**
  Acima é possível realizar o estacionamento das ligações caso esteja em ligação.
* **Telefone azul:**
  É possível realizar captura de ligações que estejam tocando em ramais que pertençam no mesmo grupo.
* **Setas laranja:**
  Através das setas é possível escolher o tipo de transferência, sendo oferecidas duas opções de escolha, transferência direta ou indireta.
* **Telefone verde:**
  Permite discar para o número inserido.
* **Microfone:**
  Permite colocar a ligação no mudo.

## Agenda do Ramal

É onde são listados todos os ramais, contatos do ramal inseridos pelo próprio usuários e contatos compartilhados.

![Untitled](../img/atendente-de-pabx/Untitled2.png)

* **Novo contato:**
  Permite adicionar um novo contato externo como um fornecedor, ou cliente.
* **Somente Ramais:**
  Quando habilitado são mostrados apenas os ramais internos.
* **Procurar:**
  Possibilita buscar por um contato.

Nesta mesma tela será possível realizar ligações para os contatos listados. Para ligar basta clicar no telefone verde que a ligação será realizada automaticamente.

## Histórico de Chamadas

Em histórico de chamadas são listados as ligações realizadas, recebidas e perdidas pelo ramal.

![Untitled](../img/atendente-de-pabx/Untitled3.png)

* **Procurar:**
  Permite buscar por um número específico.
* **Filtros:**
  Permite buscar ligações do dia atual, do dia anterior, da última semana e do último ano.

## Correio de Voz

Em correio de voz são listadas todas as ligações destinadas ao usuário que estava offline, sendo possível ouvir a mensagem deixada. Para poder utilizar esta opção é necessário que o ramal do usuário esteja vinculado a uma categoria que tenha a função correio de voz ativada.

![Untitled](../img/atendente-de-pabx/Untitled4.png)

## Configurações

Em configurações serão permitidas realizar algumas configurações como o siga-me, a senha de funcionalidades, e-mail, senha de acesso entre outras opções.

![Untitled](../img/atendente-de-pabx/Untitled5.png)

* **Siga-me:**
  Permite a ativação de um siga-me para as situações como, sempre, para quando ocupado ou para quando indisponível. Ao lado definimos se esta opção deverá ser aplicada para ligações internas, externas ou de qualquer origem, é onde também deveremos preencher com o número para onde as ligações deverão ser desviadas.
* **Senha de funcionalidades:**

  Utilizada para ativar recursos via ramal, utilizando dos códigos de funcionalidades.
* **E-mail:**
  Oferece a possibilidade de vincular um e-mail, que será útil caso o usuário esqueça sua senha e tente recuperar.
* **Senha:**
  Em senha pode se alterar a senha do usuário de login.
* **Ligação Interna:**

  Permite alterar o tom de ring, para quando a origem da ligação for uma ligação realizada de outro ramal.
* **Ligação Externa:**
  Permite alterar o tom de ring de ligações que tenham origem externa.
* **Avatar:**
  Possibilita a escolha de um avatar de sua preferência.

## Dispositivos

No menu Dispositivos pode se selecionar o dispositivo de entra e saída de áudio, tendo as opções para Microfone, Campainha e Chamada.

![Untitled](../img/atendente-de-pabx/Untitled6.png)

* **Microfone:**
  Possibilita selecionar o microfone de entrada a ser utilizado pelo Native Infinity.
* **Campainha:**
  Permite escolher a saída de áudio para a campainha, usada para chamar o ramal quando está recebendo uma ligação.
* **Chamada:**
  Permite escolher a saída de áudio para a ligação, usada no momento em que o usuário realiza o atendimento.
* **Notificação:**
  Em Notificações é informado se a permissão de notificação foi ativada no navegador.
* **Notificação do Chat:**
  Ao ativar mostrará a notificação sempre que receber uma mensagem pelo chat.
* **Gravar:**
  Em Gravar é possível gravar o áudio de seu microfone para ser possível testar se o mesmo está configurado corretamente, ao dizer algo, basta clicar em parar e o áudio será reproduzido imediatamente.
* **Volume:**
  Em volume é possível aumentar o volume de campainha e de chamada.

Observação

Para utilizar o softphone web é necessário ter um fone e microfone conectados em seu computador, também será necessário conceder as permissões de microfone na primeira vez em que for utilizar.

---

## Módulo Call Center - Dashboard

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/dashboard/

# Dashboard

Já para os usuários com acesso ao módulo de Call Center, ao realizar o login e clicar em Dashboard terão a visualização do painel monitoramento em tempo real do Call Center, contendo algumas informações gerais sobre o fluxo de ligações e agentes, tais como os demonstrados abaixo.

Vídeo aula

DICA

Quer entender melhor como você pode monitorar sua equipe em tempo real? **[Clique aqui](../na-pratica/na-monitoramento-de-equipe-em-tempo-real)** para acessar nosso conteúdo em vídeo que demonstra a utilização do Dashboard de Call Center na prática.

## Menu Dashboard

![Untitled](../../img/callcenter-dashboard/Untitled.png)

Logo no canto superior direito será possível verificar alguns botões que terão as seguintes funções.

![Untitled](../../img/callcenter-dashboard/Untitled1.png)

* **Som:**
  Ativa/Desativa: sinalização sonora dos eventos.
* **Internas:**
  Ativa/Desativa a visualização de ligações internas (ramais).
* **Sino:**
  Mostra as notificações de eventos.
* **Menu Seleção:**
  Ao lado o menu Seleção de filas para exibição, sendo possível selecionar apenas a fila desejada.

## Chamadas Ativas

![Untitled](../../img/callcenter-dashboard/Untitled2.png)

Em chamadas ativas, serão exibidas todas as chamadas que estão em curso. Ao realizar uma ligação será indicado com uma seta para a direita, que se trata de uma ligação ativa, mostrando alguns dados como a fila ativa, a posição, o número discado, o usuário que está realizando a ligação, o tempo de espera desta ligação e o tempo de atendimento. Após atender esta ligação a cor do fundo deverá mudar, sendo possível escutar ou encerrar a chamada.

![Untitled](../../img/callcenter-dashboard/Untitled3.png)

* **Botão Espião:**
  Através deste botão é possível escutar a ligação, entre usuário e cliente, tendo ainda a possibilidade de interagir com o usuário ou com ambas as partes. Ao escolher uma das opções o seu ramal deverá tocar, para isto basta atender a ligação e escutar.
* **Botão Encerrar Chamada:**
  Clique neste botão para encerrar a chamada.

## Status das Filas

![Untitled](../../img/callcenter-dashboard/Untitled4.png)

No status das filas serão mostradas informações como:

**TMA:** Tempo médio de atendimento.

**TME:** Tempo médio de espera.

**TMAB:** Tempo médio de abandono

**Atendidas:** Exibe a quantidade das ligações atendidas pela fila.

**Perdidas:** Exibe a quantidade das ligações perdidas pela fila.

**Transbordos:** Exibe a quantidade das ligações que transbordaram.

**%Atendimento:** Exibe a portcentagem das ligações que foram atendidas pela fila.

**SLA:** Nível de serviço de cada fila, sendo o nível de serviço = (Total de atendimentos dentro do SLA) / (Total de atendimentos + Total de atendimentos abandonados – Total de atendimentos abandonados com menos de 3 segundos)

**% Avaliação:** Porcentagem de atendimento com base no total de ligações atendidas e perdidas.

## Agentes

![Untitled](../../img/callcenter-dashboard/Untitled5.png)

É possível visualizar os diversos status de todos os agentes, em pausa, em ligação ou inativos, podendo ver em quais filas estão logado, hora de login, horário de sua última chamada. É possível também realizar algumas funções como selecionar filas, pausar, remover da pausar e efetuar o logoff.

Ao realizar ou receber uma ligação o avatar irá alterar sua cor entre verde e amarelo, sendo verde para ligações em atendimento e amarelo para ligações que estão tocando no ramal ou sendo realizadas pelo mesmo.

### Menu do agente

![Untitled](../../img/callcenter-dashboard/Untitled6.png)

Ao clicar no ícone a esquerda será possível realizar algumas configurações.

* **Penalty:**
  Ao ajustar penalty, ou seja, a penalidade do usuário para cada fila, fará com que um usuário só receba ligações quando outros agentes com penalidades menores já estejam em ligações.
* **Seleção de filas receptivas:**
  É possível selecionar as filas receptivas do usuário.
* **Seleção de filas ativas:**
  Será possível selecionar as filas ativas de um usuário.
* **Cadeado:**
  Permite fixar a escolha de filas e demais configurações para o usuário, assim quando o mesmo realizar o login, não será dada a opção para escolha das filas de atendimento.
* **Pausa:**
  É possível pausar o agente para que o mesmo não receba ligações.
* **Logoff:**
  Realiza o logoff do agente.

## Consolidado Atendimento

![Untitled](../../img/callcenter-dashboard/Untitled7.png)

* **Chamadas Recebidas Perdidas:**

  Será apresentado uma lista de ligações perdidas e também um gráfico com todas as chamadas atendidas e chamadas perdidas. Caso seja realizado o retorno de uma ligação que não foi atendida, então o número deixara de constar na lista, sendo considerada como uma chama atendida.

## Chamadas Atendidas X Perdidas

![Untitled](../../img/callcenter-dashboard/Untitled8.png)

Serão mostrados dois gráficos, onde a esquerda será apresentado o fluxo de ligações por horário, comparando o dia atual com o último dia em que ocorreram ligações. Já na direita será mostrado um gráfico apresentando a quantidade de ligações totais comparando o dia atual com o último dia em que ocorreram atendimentos.

## Avaliações

![Untitled](../../img/callcenter-dashboard/Untitled9.png)

Em avaliações serão mostrados dois gráficos demonstrando as avaliações realizadas pelos clientes caso esteja utilizando alguma configuração de avaliação de atendimento. No primeiro gráfico será apresentado uma porcentagem para cada nota em relação a cada fila de atendimento. Já no segundo gráfico será apresentado o total de avaliações para cada nota em relação a cada uma das filas.

## Agentes x Chamadas Atendidas:

![Untitled](../../img/callcenter-dashboard/Untitled10.png)

Serão mostrados dois gráficos, onde a esquerda será apresentado um gráfico mostrando a quantidade ligações atendidas de cada agente, a direita será mostrado uma relação em porcentagem do tempo que estes agentes estiveram em atendimento.

É possível interagir com o relatório clicando nos agentes, desta forma este não ficará visível, dando a oportunidade de visualizar o relatório de outra forma caso necessário.

---

## Módulo Call Center - Dashboard TV

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/dashboard-tv/

# Dashboard TV

O dashboard TV visa apresentar uma tela projetada para exibição em TVs, trazendo uma combinação de informações uteis para auxiliar o supervisor com a estratégia e controle das filas e ligações.

Vídeo Aula

## Menu Dashboard

![Untitled](../../img/callcenter-dashboard-tv/Untitled.png)

Algumas configurações podem ser realizadas ao clicar na engrenagem no canto superior à direita.

![Untitled](../../img/callcenter-dashboard-tv/Untitled1.png)

* **Chamadas internas:**
  Permite visualizar dados referentes a ligações internas.
* **Habilitar páginas:**
  Permite habilitar quais páginas deverão aparecer após o termino do tempo entre telas.
* **Rotacionar Páginas:**

**Tempo entre páginas:** Tempo em segundos para que a tela mude para a tela de listagens e depois para totais e totais por agentes.

**Ativar Rotação:** Permite ativar a rotação entre as telas conforme o tempo estipulado.

Ao lado da engrenagem também é possível selecionar as filas que deseja visualizar, tanto ativas quanto receptivas.

![Untitled](../../img/callcenter-dashboard-tv/Untitled2.png)

* **Seleção de filas:**

Permite selecionar as filas receptivas que serão exibidas (seta verde) e também as filas ativas (seta azul).

## Dashboard

Em “Dashboard” serão exibidas os status das filas, onde será possível acompanhar o fluxo das ligações e seus respectivos atendimentos por fila.

![Untitled](../../img/callcenter-dashboard-tv/Untitled.png)

* **User (cor verde):**

  Exibe o total de atendentes logados.
* **User (cor azul):**

  Exibe o total de usuários em atendimento.
* **User (cor laranja):**

  Exibe todos os usuários vinculados à fila que estão em pausa.
* **User (cor vermelho):**

  Exibe todos os agentes vinculados à fila que estão em pausa.
* **TMA:**
  Tempo Médio de Atendimento.
* **TME:**
  Tempo Médio de Espera.
* **TMAB:**
  Tempo Médio de Abandono.
* **Telefone (cor verde):**
  Exibe todas as ligações atendidas pela fila.
* **Telefone (cor vermelha):**
  Porcentagem de atendimento.
* **Seta (cor laranja):**
  Exibe a quantidade de ligações que transbordaram.
* **% Atendimento:**
  Exibe a porcentagem de ligações que foram atendidas pela fila.
* **SLA:**
  Nível de serviço de cada fila, calculado como (Total de atendimentos dentro do SLA) / (Total de atendimentos + Total de atendimentos abandonados - Total de atendimentos abandonados com menos de 3 segundos).

## Listagem

Em “Listagem” serão exibidas todas as chamadas ativas.

![Untitled](../../img/callcenter-dashboard-tv/Untitled3.png)

* **Fila:**
  Apresenta a fila pela qual a ligação está sendo gerada.
* **Posição:**
  Indica a posição da ligação na fila de espera.
* **Número:**
  Informa o número de telefone do cliente.
* **Atendente:**
  Exibe o nome do atendente responsável por realizar ou receber a ligação.
* **Espera:**
  Mostra o tempo de espera que a ligação teve até ser atendida.
* **Atendimento:**
  Apresenta o tempo total de atendimento da ligação.

## Totais

Em "Totais", você encontrará três gráficos. O primeiro mostra um percentual de todas as ligações atendidas, perdidas e transbordadas. O segundo apresenta uma comparação entre todas as ligações atendidas e perdidas no dia atual e no dia anterior. O terceiro exibe uma relação entre ligações atendidas e não atendidas através do percentual de atendimento de cada fila.

![Untitled](../../img/callcenter-dashboard-tv/Untitled4.png)

## Totais por Agente

Em “Totais por Agente” será exibido um grafico que mostrará o total de ligações realizadas de cada agente.

![Untitled](../../img/callcenter-dashboard-tv/Untitled5.png)

## Agentes

Em “Agentes” serão trazidas informações detalhadas das ligações recebidas e realizadas de cada atendente de Call Center.

![Untitled](../../img/callcenter-dashboard-tv/Untitled6.png)

* **Agentes:**
  Exibe informações de todos os atendentes que realizaram atendimento.
* **Efetuadas:**
  Apresenta dados de todas as ligações efetuadas pelos atendentes, incluindo as atendidas, não atendidas e o tempo médio de atendimento (TMA).
* **Recebidas:**
  Mostra informações sobre as ligações recebidas pelos atendentes, incluindo as atendidas, não atendidas e o tempo médio de atendimento (TMA).

## Avaliações

Em "Avaliações", serão exibidos dois gráficos. O primeiro mostrará a porcentagem de avaliações com base nas notas obtidas, enquanto o segundo apresentará os totais avaliações conforme as notas.

![Untitled](../../img/callcenter-dashboard-tv/Untitled7.png)

---

## Módulo Call Center - Cadastros

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/cadastros/

# Cadastros

Em cadastros será possivel cadastrar pausas, metas e scripts que podereão ser utilizados pelo usuários do módulo de Call Center

Vídeo Aula

## Menu Cadastros

![Untitled](../../img/callcenter-cadastros/Untitled.png)

## Tipo de Pausas

Em tipos de pausas é possível cadastrar ou editar as pausas que serão utilizadas pelos usuários sempre que necessário.

![Untitled](../../img/callcenter-cadastros/Untitled1.png)

Ao clicar em nova pausa teremos:

* **Tipo:**
  Nome da pausa.
* **Descrição:**
  Breve descrição sobre a pausa.
* **Tempo previsto:**
  Tempo previsto em segundo para a pausa, onde ao ser inserido, será mostrado como um contador regressivo na tela do agente.
* **Aprovações:**
  Exigências que o agente deverá cumprir para realizar as pausas.
* **Requer aprovação:**
  Para que o agente entre no modo pausa, será solicitado ao supervisor permissão.
* **Exige justificativa:**
  Exige que o agente preencha o campo justificativa.
* **Exige justificativa de atraso:**
  Exige justificativa quando o agente retorna da pausa estando em atraso.
* **Produtiva:**
  Identifica o tipo de pausa, visando gerar relatórios coerentes com o tempo de trabalho dos agentes.

  **SIM:** Ao selecionar sim, a pausa irá contabilizar o tempo em pausa como tempo produtivo nos relatórios. Ex: atendimento presencial a clientes, preenchimento de relatórios e, etc...

  **NÃO:** Ao selecionar não, a pausa não irá contabilizar o tempo em pausa como tempo produtivo nos relatórios.
* **Global:**

  Ao ativar esta opção, a pausa se tornará disponível para todas as filas de atendimento. Caso não seja habilitada, para utilizar a pausa será necessária vincular esta diretamente na fila desejada.

## Metas

É possível criar metas para acompanhar o desempenho e qualidade de atendimento para as filas do Callcenter, verificando o tempo médio de espera, atendimento, abandono e percentual de atendimento, gerando alerta para quando a meta for alcançada.

![Untitled](../../img/callcenter-cadastros/Untitled2.png)

Ao clicar em nova meta teremos:

* **Tipo:**
  São as métricas que podem ser verificadas.
* **Meta (segundos):**
  Tempo em segundos que determina o valor da meta.
* **Descrição:**
  Breve descrição sobre a meta
* **Notificações:**
  É possível notificar com um alerta ou aviso

  **Alerta:** Ao não alcançar a meta mostra um alerta visual na cor amarelo, sempre que alcançar 50% da meta.

  **Aviso:** Ao não alcançar a meta mostra um alerta visual na cor vermelha quando atingido 100% da meta e também gera um aviso sonoro.
* **Filas:**
  Seleção de das filas em que a meta será aplicada.
* **Global:**
  Ao ativar esta opção, a meta se tornará disponível para todas as filas de atendimento. Caso não seja habilitada, será necessário selecionar as filas que terão a meta vinculada.

## Scripts

É possível criar diferentes scripts que posteriormente vinculados a filas poderão ser preenchidos por usuários ou utilizados como base para um determinado tipo de atendimento durante um atendimento.

![Untitled](../../img/callcenter-cadastros/Untitled3.png)

### Configurações

* **Nome:**
  Nome do Script.
* **Descrição:**
  Breve descrição sobre o script
* **Expandir:**
  Expande as páginas existentes.
* **Nova pagina:**
  Abre uma página para criação do script.
* **Recolher:**
  Recolhe as páginas existentes.
* **Preview do script:**
  Demonstração do script criado.
* **Recarregar Script:**
  Atualiza a tela carregando o script criado.

### Permissões

* **Filas:**
  Permite atrelar o script a diferentes filas.

---

## Módulo Call Center - Atendente

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/atendente-de-call-center/

# Atendente de Call Center

Para os agentes de Call Center, ao realizar o login no Native Infinity a tela será diferente da tale de usuários convencionais, ou seja, usuários que não pertencem ao Call Center.

Vídeo Aula

DICA

Quer entender melhor como utilizar os ramais de atendentes de Call Center? **[Clique aqui](../na-pratica/na-atendente-de-call-center)** para acessar nosso conteúdo em vídeo que demonstra a utilização dos ramais de atendentes de Call Center na prática.

## Tela do atendente de Call Center

![Untitled](../../img/callcenter-agentes/Untitled.png)

Logo após a realização do login, será solicitado para o agente que o mesmo selecione as filas com que ele irá realizar atendimento, sendo possível selecionar todas as filas receptivas e apenas uma fila ativa.

![Untitled](../../img/callcenter-agentes/Untitled1.png)

* **Seta verde:**
  Indica as filas receptivas, sendo possível selecionar uma ou várias.
* **Seta azul:**
  Indica a fila responsável para realização das ligações, sendo possível escolher apenas uma.

## Seleção de filas

Uma vez escolhida as filas é possível realizar a alteração através do menu de seleção de filas no topo do sistema

![Untitled](../../img/callcenter-agentes/Untitled2.png)

## Configurações

Logo ao lado temos também o botão para realizar o logoff e o menu de configuração adicionais.

![Untitled](../../img/callcenter-agentes/Untitled3.png)

### Usuários

![Untitled](../../img/callcenter-agentes/Untitled4.png)

* **E-Mail:**
  Permite alterar o e-mail para recuperação de senha.
* **Senha:**
  Possibilita a alteração de senhas.
* **Avatar:**
  Disponibiliza algumas opções de avatar para escolha.

### Ringtones

![Untitled](../../img/callcenter-agentes/Untitled5.png)

* **Lig. Interna:**
  Permite escolher um tom de ring diferente para quando estiver recebendo uma ligação interna.
* **Lig. Externa:**
  Permite escolher um tom de ring diferente para quando estiver recebendo uma ligação externa.

### Dispositivos

![Untitled](../../img/callcenter-agentes/Untitled6.png)

* **Microfone:**
  Possibilita alterar a entrada de áudio, alternando entre os microfones que estiverem conectados e disponíveis em seu computador.
* **Chamada:**
  Possibilita alterar a saída de áudio da ligação, podendo escolher um fone diferente da campainha.
* **Volume da Chamada:**
  Possibilita ajustar o volume da chamada.
* **Ring**:
  Possibilita alterar a saída de áudio da campainha, podendo escolher um fone ou até mesmo uma caixa de som.
* **Volume do Ring**:
  Possibilita ajustar o volume da campainha.
* **Notificações**:
  Informa se seu navegador está com a notificação habilitada. Caso não esteja será necessário habilitar.
* **Notificação do Chat**:
  Habilita as notificações do chat.

## Pausa

Em Pausas é possível escolher o tipo de pausa conforme pausas criadas e disponibilizadas pelo admin do sistema. Cada pausa terão diferentes requisitos e tempos.

![Untitled](../../img/callcenter-agentes/Untitled7.png)

## Fila de Chamadas

Exibe as ligações que estarão aguardando atendimento na fila em que o usuário estiver logado, trazendo informações como o nome da fila, a posição dentro da fila, o número de telefone e o tempo de espera.

![Untitled](../../img/callcenter-agentes/Untitled8.png)

## Histórico de Chamadas

Serão trazidas as informações das ligações recebidas e realizadas pelo seu usuário conforme fila de atendimento que estiver vinculado.

![Untitled](../../img/callcenter-agentes/Untitled9.png)

Ao clicar no “i” é informado algumas informações sobre o percurso da ligação até sua finalização

![Untitled](../../img/callcenter-agentes/Untitled10.png)

Observação

Como funciona o **Histórico de Chamadas**?

A cor do ícone, representa o status do ramal na ligação.A cor da linha, representa o status da ligação na fila.

*Ligação atendida na fila e atendida pelo ramal.*

![Untitled](../../img/callcenter-agentes/Untitled11.png)

*Ligação atendida na fila, mas perdida pelo ramal.*

![Untitled](../../img/callcenter-agentes/Untitled12.png)

*Ligação perdida na fila e perdida pelo ramal.*

![Untitled](../../img/callcenter-agentes/Untitled13.png)

*Ligação perdida na fila, mas não tocou no ramal.*

![Untitled](../../img/callcenter-agentes/Untitled14.png)

*Ligação perdida na fila e retornada com sucesso.*

![Untitled](../../img/callcenter-agentes/Untitled15.png)

## Status da ligação

Ao receber ou realizar uma ligação, na barra inferior serão trazidas informações sobre a ligação em curso.

![Untitled](../../img/callcenter-agentes/Untitled16.png)

## Chat

No canto inferior esquerdo, será disponibilizado também o acesso ao chat com todos os usuários do sistema.

![Untitled](../../img/callcenter-agentes/Untitled17.png)

## Softphone Web

Ao clicar no telefone branco no canto esquerdo inferior irá aparecer o softphone web, por ele será possível realizar e receber ligações. Caso o usuário possua um ramal atrelado, este deverá aparecer não canto da tela do softphone.

![Untitled](../../img/callcenter-agentes/Untitled18.png)

* **Botoes 1, 2, 3, e 4:**
  Acima é possível realizar o estacionamento das ligações caso esteja em ligação.
* **Telefone azul:**
  É possível realizar captura de ligações que estejam tocando em ramais que pertençam no mesmo grupo.
* **Setas laranja:**
  Através das setas é possível escolher o tipo de transferência, sendo oferecidas duas opções de escolha, transferência direta ou indireta.
* **Telefone verde:**
  Permite discar para o número inserido.
* **Microfone:**
  Permite colocar a ligação no mudo.

## Agenda

Exibe os contatos cadastrados na agenda do ramal, tanto os contatos cadastrados pelo próprio usuário quanto os que foram cadastrados por outros usuários e que o compartilharam.

![Untitled](../../img/callcenter-agentes/Untitled19.png)

## Histórico de Chamadas do Ramal

Permite visualizar o histórico de chamadas direcionadas diretamente ao ramal.

![Untitled](../../img/callcenter-agentes/Untitled20.png)

Observação

Uma dica muito importante!

Verifique se você já possui no seu navegador a "**Native Infinity Extension**" instalada. Caso contrário é só clicar [aqui](https://chrome.google.com/webstore/detail/native-infinity-extension/kfjdedahohjonofdcnbhnpdcgnjhgpcn/related?hl=pt-BR) e adicionar ela ao seu navegador. Com ela instalada, você evita que o navegador coloque a guia em "espera", para que você não perca a conexão do seu ramal!

![https://infinity.nativeip.com.br/assets/img/extension/native-extension.png](https://infinity.nativeip.com.br/assets/img/extension/native-extension.png)

---

## Módulo Call Center - Relatório Agente Consolidado Atendidas

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/agente-consolidado-atendidas/

# Agente - Consolidado Atendidas

Através do relatório Agente - Consolidado Atendidas, podemos obter um total sobre os atendimentos realizados pelos agentes. Temos as seguintes opções de filtros para o relatório.

Vídeo Aula

## Relatório Agente - Consolidado Atendidas

![Untitled](../../../img/callcenter-relatorios/Untitled.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Agente Consolidado Atendimento

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/agente-consolidado-atendimento/

# Agente - Consolidado Atendimento

Através do relatório Agente - Consolidado Atendimento, podemos obter um consolidado do tempo em que um agente esteve logado e em atendimento. Para este relatório temos as seguintes opções de filtros.

Vídeo Aula

## Relatório Agente - Consolidado Atendimento

![Untitled](../../../img/callcenter-relatorios/Untitled1.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Agente Consolidado Pausas

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/agente-consolidado-pausas/

# Agente - Consolidado Pausas

No relatório Agente - Consolidado Pausas, teremos um consolidado do tempo em que um agente esteve em pausa, assim como também o número de pausas realizado por cada agente. Para este relatório temos as seguintes opções de filtros.

Vídeo Aula

## Relatório Agente - Consolidado Pausas

![Untitled](../../../img/callcenter-relatorios/Untitled2.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Agente Detalhado Pausas

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/agente-detalhado-pausas/

# Agente - Detalhado Pausas

No relatórios Agente - Detalhado Pausas é oferecido um resumo detalhado sobre as pausas realizada por um atendente de Call Center, também conhecido como agente. Você pode pesquisar as informações de um agente específico ou de toda uma fila de atendimento.

Vídeo Aula

## Relatório Agente - Detalhado Pausas

![Untitled](../../../img/callcenter-relatorios/Untitled2.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Agente Detalhado Sessões

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/agente-detalhado-sessoes/

# Agente - Detalhado Sessões

No relatório Agente - Detalhado Sessões, sará disponibilizado um detalhado dos horários em que um agente realizou login e logoff, também serão informadas as pausas realizadas por cada agente. Para este relatório temos as seguintes opções de filtros.

Vídeo Aula

## Relatório Agente - Detalhado Sessões

![Untitled](../../../img/callcenter-relatorios/Untitled3.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Agente Detalhado Sessões em Filas

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/agente-detalhado-sessoes-em-filas/

# Agente - Detalhado Sessões em Filas

No relatório Agente - Detalhado Sessões em Filas, sará disponibilizado um detalhado dos horários em que um agente realizou login e logoff em uma determinada fila, também será informado o tempo que o agente permaneceu logado em cada fila. Para este relatório temos as seguintes opções de filtros.

Vídeo Aula

## Relatório Agente - Detalhado Sessões em Filas

![Untitled](../../../img/callcenter-relatorios/Untitled4.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Consolidado por Agente

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-consolidado-por-agente/

# Chamadas - Consolidado por Agente

No relatório Chamadas - Consolidado por Agente, sará disponibilizado um detalhado dos tempos de atendimento, de espera, a quantidade de ligações perdidas, a quantidade de ligações atendidas e o total de ligações de um agente. Para este relatório temos as seguintes opções de filtros.

Vídeo Aula

## Relatório Chamadas - Consolidado por Agente

![Untitled](../../../img/callcenter-relatorios/Untitled5.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Domínio das Ligações:**
  Permite escolher o tipo de ligação se interna, ou externa.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Consolidado por Agente c/ Avaliação

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-consolidado-por-agente-c-avaliacao/

# Chamadas - Consolidado por Agente com Avaliação

Em Chamadas - Consolidado por agente c/ Avaliação será exibido um consolidado com todas as ligações perdidas, atendidas e transbordadas de cada agente, sendo informado também a quantidade de avaliações que o agente recebeu e sua média.

Vídeo Aula

## Relatório Chamadas - Consolidado por Agente com Avaliação

![Untitled](../../../img/callcenter-relatorios/Untitled6.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por agentes em uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Consolidado por Fila

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-Consolidado-por-fila/

# Chamadas - Consolidado por Fila

No relatório Chamadas - Consolidado por fila, sará disponibilizado um detalhado dos tempos de atendimento, quantidade de ligações perdidas, atendidas, transbordadas e transferidas de cada fila. Para este relatório temos as seguintes opções de filtros.

Vídeo Aula

## Relatório Chamadas - Consolidado por Fila

![Untitled](../../../img/callcenter-relatorios/Untitled7.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por uma determinada fila.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Domínio das Ligações:**
  Permite escolher o tipo de ligação se interna, ou externa.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**

  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Detalhado Atendidas

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-detalhado-atendidas/

# Chamadas - Detalhado Atendidas

Em Chamadas - Detalhada Atendidas é possível extrair um detalhado de todas as ligações realizadas e recebidas pelo Call Center, trazendo informações como data, hora, protocolo, número de telefone, fila de atendimento, tempos de espera, atendimento, o agente que realizou o atendimento, motivo da desconexão, a gravação da ligação, etc.

Vídeo Aula

## Relatório Chamadas - Detalhado Atendidas

![Untitled](../../../img/callcenter-relatorios/Untitled8.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar ligações de uma determinada fila.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Protocolo:**
  Protocolo gerado para a ligação.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Espera:**
  Tempo de espera da ligação.
* **Atendimento:**
  Tempo de atendimento da ligação.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Detalhado Fora do Horário

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-detalhado-fora-do-horario/

# Chamadas - Detalhado Fora do Horário

Em Chamadas - Detalhado Fora do Horário serão trazidas todas as ligações recebidas fora do horário de atendimento e que foram desviadas ou desligadas devido a um horário de atendimento, evento ou feriado que tenha sido configurado.

Vídeo Aula

## Relatório Chamadas - Detalhado Fora do Horário

![Untitled](../../../img/callcenter-relatorios/Untitled9.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por uma filaque tenha recebido a ligação.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Protocolo:**
  Protocolo gerado para a ligação.
* **URAs:**
  Permite buscar por URA que tenha recebido a ligação.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.
  >

---

## Módulo Call Center - Relatório Chamadas Detalhado Perdidas

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-detalhado-perdidas/

# Chamadas - Detalhado Perdidas

Em Chamadas - Detalhado Perdidas serão trazidas todas as ligações que não obtiveram atendimento, tanto realizadas quanto recebidas.

Vídeo Aula

## Relatório Chamadas - Detalhado Perdidas

![Untitled](../../../img/callcenter-relatorios/Untitled10.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar ligações de uma determinada fila.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Protocolo:**
  Protocolo gerado para a ligação.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Espera:**
  Tempo de espera da ligação.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Distribuição por Dia

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-distribuicao-por-dia/

# Chamadas - Distribuição por Dia

Em Chamadas - Distribuição por dia temos os totais de ligações atendidas, perdidas, transbordadas conforme os dias selecionados.

Vídeo Aula

## Relatório Chamadas - Distribuição por Dia

![Untitled](../../../img/callcenter-relatorios/Untitled11.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por dados de uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Filtro avançado:**
  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**

  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Call Center - Relatório Chamadas Distribuição por Hora

**URL:** https://wiki.native-infinity.com.br/modulo-callcenter/relatorios/chamadas-distribuicao-por-hora/

# Chamadas - Distribuição por Hora

Em Chamadas - Distribuição por Hora temos os totais de ligações atendidas, perdidas, transbordadas, tempo médio de abandono, de espera e de atendimento por horário.

Vídeo Aula

## Relatório Chamadas - Distribuição por Hora

![Untitled](../../../img/callcenter-relatorios/Untitled12.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Filas:**
  Permite buscar por dados de uma determinada fila.
* **Agentes:**
  Permite buscar especificamente por um determinado agente.
* **Telefone:**
  Possibilita buscar ligações com base em um número de telefone.
* **Sentido das ligações:**
  É possível restringir entre chamadas recebidas ou realizadas.
* **Filtro avançado:**

  O campo de filtro avançado é utilizado em casos onde os campos do relatório não atendem sua necessidade. Para isso temos a opção de filtrar colunas da base de dados como uma opção avançada.

  O uso da funcionalidade deve ser consultada com a equipe de suporte do native infinity.
* **Gerar relatório:**
  Ao preencher os campos é necessário clicar no botão gerar relatório para serem carregadas as informações buscadas, sendo possível ouvir a gravação da ligação, caso tenha sido habilitado a opção de gravar nas categorias e filas.
* **Exportar CSV:**
  Permite exportar a busca realizada para um arquivo CSV.

---

## Módulo Cobrança - Dashboard

**URL:** https://wiki.native-infinity.com.br/modulo-cobranca/dashboard/

# Dashboard

Em Dashboard serão exibidas informações uteis como o status de cada campanha criada.

Vídeo Aula

## Menu Dashboard

![Untitled](../../img/cobranca-dashboard/Untitled.png)

* **Em cobrança:**
  Valor total das faturas em atraso, referente ao período da cobrança.
* **Total:**
  Valor Recuperado e Valor Não Recuperado.

  + **Valor Recuperado:** É considerado um valor recuperado, a ligação que foi até a última opção do modo de antedimento, por exemplo: (Cobrança com os modos de atendimento: Áudio, 2ª via e Fila de antedimento). A pessoa ouviu o áudio, passou pela 2ª via e foi direcionada para a fila de atendimento. Essa ligação passará a ser contada como um valor recuperado, pois ela foi até a última opção do modo de atendimento.
  + **Valor Não Recuperado:** É considerado um valor não recuperado, a ligação que não foi até a última opção do modo de antedimento. Pensando no exemplo anterior, a pessoa ouviu o áudio e desligou. Essa ligação será um valor não recuperado.
* **Gráfico de barra:**
  Este gráfico é referente aos status das ligações/discagens. É considerado uma ligação com sucesso, a ligação que teve atendimento. E uma ligação é considerada sem sucesso se, não obteve atendimento humano depois de todas as tentativas de discagem.

---

## Módulo Cobrança - Cobranças

**URL:** https://wiki.native-infinity.com.br/modulo-cobranca/cobrancas/

# Cobranças

Em cobranças pode-se criar as campanhas de cobranças que serão discadas, sendo possível estipular alguns parâmetros para a discagem.

vídeo Aula

## Menu Cobranças

![Untitled](../../img/cobranca-cobrancas/cobranca.png)

* **Nome:**
  Nome da campanha de cobrança.
* **Tipo:**
  Permite escolher a forma que será realizado as discagens desta cobrança.

  **Automático:** Caso opte por automático, será realizada a discagem de forma automática, com base na lista de clientes em débito no período selecionado.

  **Manual:** Caso opte por manual, será discado para os números inseridos em uma lista do tipo .CSV, lista esta que você deverá atribuir a campanha.

  Para atribuir uma lista, é necessário fornecer campos compostos por colunas que incluam o nome, telefone e o valor em débito.

  Também será necessário selecionar os campos correspondentes ao telefone e aos valores em débito, conforme imagem abaixo.

![Untitled](../../img/cobranca-cobrancas/Untitled3.png)

DICA

É possível obter uma lista de exemplo para utilização **[clicando aqui](../../download-files/billing_exemple.csv)**

* **Dias em Débito:**

  Quantidade miníma de dias que o cliente deverá estar em débito para que seja incluído na lista de discagem.
* **Até:**
  Quantidade máxima de dias que deverá estar em débito para que continue incluído na lista de discagem.
* **Lig. Simultâneas:**
  Número de ligações simultâneas que serão realizadas pela campanha.
* **Falha consecutivas:**
  Quantidade de falhas necessárias para que seja realizada uma pausa de Operação.
* **Pausas de operação:**
  Tempo em segundos para pausa após um determinado número de falhas consecutivas.
* **Modo de Atendimento:**
  Permite escolher as etapas que serão realizadas pela campanha ao ligar para os contatos em débito.

  + **Áudio:** Possibilita a inserção de áudio que será tocado no momento em que o cliente atender a ligação.
  + **2ª Via:** Caso possua integração com o módulo de cobrança, será possível oferecer o envio da segunda via do boleto para o cliente, assim que o cliente pressionar o digito 1. É necessário ter esta opção verbalizada no áudio para que o cliente saiba que será necessário pressionar o digito, caso queira receber a 2ª via.

  **Fila de Atendimento:** Encaminha a ligação para uma fila de atendimento.
* **Inicio:**
  Horário de início da discagem de cobrança.
* **Fim:**
  Horário de fim da discagem de cobrança.
* **Dias da Semana:**
  Dias que deverão ser realizadas as discagens de cobranças.

Observação

## Modos de Atendimento Possíveis

**Áudio e Fila de Atendimento:**
- Tocar o áudio;
- Após 5 segundos, chama a fila.

**Áudio e 2ª via:**
- Tocar o áudio e capturar dígito;
- Opção 1: Gerar 2ª via;
- Desligar a ligação;
- Sem dígitos: Após 5 segundos, encerra a ligação.

**Áudio, 2ª via e Fila de Atendimento:**
- Tocar o áudio e capturar dígito;
- Opção 1: Gerar 2ª via (No caso de digitar '1', a ligação será encerrada.);
- Após 5 segundos, chama a fila.

---

## Módulo Cobrança - Configurações

**URL:** https://wiki.native-infinity.com.br/modulo-cobranca/configuracoes/

# Configurações

Em Configurações são disponibilizados alguns parâmetros configuráveis como, a rota de saída, o número de tentativas e as regras de reprogramação, que são os tempos para o retorno das discagem que não obtiveram sucesso, sendo possível definir um tempo específico para cada ocasião.

vídeo Aula

## Menu Configurações:

![Untitled](../../img/cobranca-configuracoes/Untitled.png)

* **Rota de Saída:**
  Permite selecionar a rota de saída que será utilizada pelo módulo Cobrança.
* **Tentativas de Discagem:**
  Possibilita definir quantas vezes será realizada a discagem para o cliente caso a ligação não seja completada na primeira tentativa.
* **Regras de Reprogramação:**
  São os tempos para o retorno das discagem que não obtiveram sucesso, sendo possível definir um tempo específico para cada ocasião.

  + **Nome:** Nome do retorno identificado pelo AMD.
  + **Descrição:** Descrição do retorno identificado pelo AMD.
  + **Intervalo (seg.):** Tempo em segundos para ser realizado o retorno das ligações conforme número de tentativas.

---

## Módulo Cobrança - Relatórios

**URL:** https://wiki.native-infinity.com.br/modulo-cobranca/relatorios/

# Relatórios

Em relatórios são trazidas as informações pertinentes as discagem realizadas pelo módulo de cobrança.

Vídeo Aula

## Menu Relatórios

![Untitled](../../img/cobranca-relatorios/Untitled.png)

* **Inicio:**
  Data de início da pesquisa a ser realizada.
* **Fim:**
  Data de fim da pesquisa a ser realizada.
* **Campanha:**
  Campanha a ser pesquisada.

Ao realizar a busca será possível obter as seguintes informações.

* **Data:**
  Data da pesquisa realizada.
* **Campanha:**
  Campanha pesquisada.
* **Qtd. Contatos:**
  Quantidade total de contatos listados na data pesquisada.
* **Qtd. Ligações:**
  Quantidade total de ligações realizadas, contabilizando todas as tentativas.
* **Áudio:**
  Quantidade de vezes em que o áudio foi reproduzido até o final.
* **Boleto:**
  Quantidade de vezes em que foi pressionado um para recebimento do da 2ª via.
* **Atendimentos:**
  Quantidade de vezes em que a ligação foi transferida para a fila de atendimento.
* **TMA:**
  Tempo médio de atendimento até a transferência das ligações
* **Valor Recuperado:**
  Total dos valores recuperados, sendo considerado um valor recuperado, a ligação que foi até a última opção do modo de antedimento, por exemplo: (Cobrança com os modos de atendimento: Áudio, 2ª via e Fila de antedimento). A pessoa ouviu o áudio, passou pela 2ª via e foi direcionada para a fila de atendimento. Essa ligação passará a ser contada como um valor recuperado, pois ela foi até a última opção do modo de atendimento.
* **Valor total:**
  Valor total com base em Valor recuperado e valor não recuperado no dia pesquisado.

---

## Módulo Discador - Dashboard

**URL:** https://wiki.native-infinity.com.br/modulo-discador/dashboard/

# Dashboard

Em dashboard poderemos acompanhar o andamento das campanhas e fluxo de ligações em tempo real.

Vídeo Aula

O dashboard do discador é separado em três principais blocos de informação, onde podemos monitorar o andamento, status, gráficos e chamadas ativas.

Através do dashboard você vai visualizar os blocos de informações separados na seguinte ordem:

* **Campanhas:**
  Em campanhas temos a lista de campanhas criadas e ativas, podemos iniciar uma campanha, parar uma campanha e monitorar suas configurações de canais e multiplicador.
  É possível monitorar o andamento da lista através de uma barra de progresso, onde apresentamos em porcentagem contatos finalizados, nunca ligados e aguardando rediscagem.
* **Gráficos:**
  O dashboard apresenta quatro gráficos para monitorar o andamento e status de suas campanhas.
  + **Ligações por hora:** Apresenta ligações realizadas por hora pelo discador.
  + **Status das ligações:** Apresenta em porcentagem a quantidade de chamadas atendidas e chamadas com erro separando a informação por listas.
  + **Atendidas:** Apresenta em porcentagem classificações de chamadas, seguindo o padrão de classificação para rediscagem.
  + **Erros:** Apresenta em porcentagem chamadas com erros ordenadas por listas.
* **Chamadas Ativas:**
  Apresenta ligações ativas do discador, informando sua campanha, número, status da ligação com base na classificação de rediscagem, data e número de tentativas já realizadas para o contato.

---

## Módulo Discador - Listas

**URL:** https://wiki.native-infinity.com.br/modulo-discador/listas/

# Listas

Em listas é onde vamos carregar um arquivos com os contatos que serão discados através de campanhas do discador.

Vídeo Aula

## Criando uma lista

![Untitled](../../img/discador-listas/menulistas.png)

Através do menu de listas temos a opção de criar uma nova lista através do botão Nova Lista.

* **Nome:**
  Nome da lista a ser criada
* **Descrição:**
  Texto com a descrição da lista. O campo descrição é opcional, sendo utilizado para facilitar a gestão de listas por sua equipe.
* **Lista(csv):**
  Campo onde deve ser carregado o arquivo de lista no formato csv.

  + **Requisitos para configuração do arquivo de lista:**
  + Lista no formato CSV com delimitador de campo ponto e vírgula (;) e delimitador de texto como aspas duplas (").
  + O discador considera cada linha como um contato, sendo assim contatos repetidos serão discados múltipals vezes.
  + Evitar o uso de caracteres especiais em colunas de contatos telefônicos.
  + Contatos com múltiplas telefones devem ter os números separados em diferentes colunas da lista. O discador não aceita múltiplos números de telefone em uma única coluna.
* **Ativado:**
  Para que a lista possa ser adicionada em uma campanha é necessário marcar o campo ativado.

  O campo ativado pode ser desmarcado para evitar que a lista seja utilizada em campanhas.

## Verificando a integridade da lista

Após carregar o arquivo de lista será exibido uma tabela com suas colunas, sendo necessário selecionar colunas de contatos telefônicos a serem utilizados pelo discador.

![Untitled](../../img/discador-listas/criando-lista-01.png)

| Coluna | Descrição |
| --- | --- |
| Coluna | Titulo de colunas identificadas no arquivo de lista |
| Telefone | Coluna referente ao contato de telefone do cliente. Uma lista pode ter multiplas colunas com telefone, sendo necessário que todas sejam selecionadas. |
| Telefone Principal | É obrigatório selecionar uma coluna como telefone principal e apenas uma coluna pode ser selecionada como telefone principal. Em listas onde um cliente tem multiplos contatos para discagem o discador primeiro vai discar no telefone principal, caso não tenha sucesso então será discador para os demais telefones. |

DICA

Antes de salvar sua nova lista você pode ter uma visualização rápida para garantir que os dados estão de acordo conforme exemplo a seguir.

![Untitled](../../img/discador-listas/visualiza-lista.png)

## Reciclando uma lista

Para listas de discador já criadas e configuradas temos algumas opções como reciclar a lista e baixar o arquivo csv.

Para reciclar uma lista a mesma já deve ter sido utilizada em uma campanha de discador.

![Untitled](../../img/discador-listas/listas-criadas.png)

* **Reciclar:**

  Permite recriar uma lista para novas discagens com base nos resultados das discagens realizadas anteriormente para a lista em questão. É possível escolher quais contatos deverão estar na lista reciclada, utilizando filtros específicos para gerar a nova lista.

![Untitled](../../img/discador-listas/reciclando.png)

* **Download:**
  O botão de download permite baixar o arquivo CSV que foi enviado na configuração da lista.

---

## Módulo Discador - Campanhas

**URL:** https://wiki.native-infinity.com.br/modulo-discador/campanhas/

# Campanhas

Em campanhas é onde criamos e configuramos as campanhas de discagens, onde será possível definir o comportamento destas discagens.

Vídeo Aula

## Criando uma campanha

![Untitled](../../img/discador-campanhas/menu-campanhas.png)

Ao clicar em nova campanha será solicitado o nome da campanha e sua configuração. Durante a criação de uma campanha vamos configurar seus parâmetros de discagem, rota para saída de chamadas e listas.

* **Nome:**
  Nome da campanha
* **Descrição:**
  Campo para adicionar uma descrição da campanha, sendo o campo descrição opcional.
* **Atendedor:**
  Em atendedor é configurado o destino onde o cliente será direcionado, onde podemos configurar uma fila ou URA de atendimento.

  + **Atendedor Fila:** Caso seja selecionado o atendedor como uma fila, então será exibido o campo para selecionar a fila destino da ligação.
  + É obrigatório que a fila tenha a opção call center marcada como sim para que possa ser utilizada em uma campanha de discador.
  + **Atendedor URA:** Caso seja selecionado o atendedor como uma URA, então será exibido os seguintes campos:
  + **Destino:** URA que será direcionada a ligação.
  + **Período:** Em período vamos configurar a data de inicio e data final para execução da campanha.
  + **Horário:** Em horário será configurado o intervalo de horário que a campanha estará discando.
  + **Dias:** Dias da semana que a campanha deve discar para os clientes.
* **Rota de saída:**
  Rota para saída de ligações que a campanha deve utilizar. É necessário ter configurado uma rota de plano de discagem para uso do discador.
  Você pode verificar a configuração de sua rota de saída em [plano de discagem](../../plano-de-discagem/).
* **Tentativas:**
  Numero de tentativas de contato para cada contato de sua lista. Caso o contato seja atendido o mesmo não volta a receber novas ligações, apena é utilizado o valor de tentativas em casos sem sucesso.
* **Multiplicador:**
  Número de discagens que serão realizadas por agente. Por exemplo, se o multiplicador estiver configurado como 1, apenas uma ligação será disparada por agente. Se for configurado como 2, serão discadas duas ligações por agente.
* **Canais**:
  Quantidade máxima de canais para discagem. O número de canais deve ser compatível com os canais contratados com sua operadora.
* **Falha consecutivas:**
  Quantidade de falhas necessárias para que seja realizada uma pausa de Operação.
* **Pausas de operação:**
  Tempo em segundos para pausa após um determinado número de falhas consecutivas.
* **Discagem reversa:**
  Definimos que primeiramente é estabelecida uma ligação com o agente para depois discar para o cliente.
* **Regras de reprogramação:**
  São as regras criadas referente aos atendimentos realizados e que não obtiveram êxito, onde podemos definir diferentes tempos em segundos, para voltar a discar para os números da lista de acordo com cada situação.
* **Listas:**
  São as listas que anteriormente foram inseridas no menu listas, contendo os dados como nome e número de telefone que deverão ser discados.
* **Situação:**
  Situação da campanha, se ativa ou desativada, caso esteja ativada esta estará visível no dashboard para que seja possível realizar o play e pause da discagem.

## Regras de reprogramação do discador

| Nome da regra | Descrição | Intervalor para rediscagem |
| --- | --- | --- |
| Atendimento Humano | Atendimento do cliente qualificado como HUMANO e atendida por agente | Padrão é 0 |
| Atendimento Humano sem agente | Atendimento do cliente qualificado como HUMANO e NÃO atendida por agente | Padrão é 1800 segundos |
| Atendimento Máquina | Atendimento do cliente qualificado como MÁQUINA | Padrão é 1800 segundos |
| Atendimento Sem Certeza | Não foi possível qualificar o atendimento do cliente e atendida por agente | Padrão é 0 segundos |
| Atendimento Sem Certeza sem agente | Não foi possível qualificar o atendimento do cliente e NÃO atendida por agente | Padrão é 1800 segundos |
| Ocupado | Destino ocupado | Padrão é 1800 segundos |
| Cancelamento | Destino não atendeu dentro de 45s | Padrão é 1800 segundos |
| Canal Indisponível | Retorno de erro pela operadora ou falha no link | Padrão é 1800 segundos |
| Congestionamento | Retorno de erro pela operadora | Padrão é 1800 segundos |
| Não atendimento | Operadora não conseguiu atingir o destino | Padrão é 1800 segundos |

---

## Módulo Discador - Grupos

**URL:** https://wiki.native-infinity.com.br/modulo-discador/grupos/

# Grupos

O discador permite criar grupos de campanhas para que o supervisor da campanha possa acompanhar apenas os seus grupos selecionados.

Vídeo Aula

## Criando um novo grupo

* **Novo Grupo:**
  Ao clicar em Novo Grupo será necessário dar nome ao grupo e selecionar as campanhas que deseja deixar visível a este grupo. Posteriormente ao criar um usuário supervisor de discador, serão disponibilizados grupos para vincular ao usuário.

![Untitled](../../img/discador-grupos/menu-grupos.png)

---

## Módulo Discador - Relatórios

**URL:** https://wiki.native-infinity.com.br/modulo-discador/relatorios/

# Relatórios

O discador apresenta o menu relatórios, contemplando informações sobre suas campanhas e listas.

## Relatórios - Discagens detalhado

O relatório de discagens detalhado vai apresentar informações de desempenho de sua campanha, apresentando o total de ligações e efetividade de contato com clientes.

![Untitled](../../img/discador-relatorios/discagens-detalhado.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Campanhas:**
  Seleciona a campanha de discador.
* **Listas:**
  Seleciona a lista conforme campanha selecionada no filtro de campanhas.

## Relatórios - Discagens por contato

O relatório de discagens por contato vai apresentar informações de chamadas com base nos contatos configurados em suas listas. Será possível identificar todas ligações e quantidade de tentativas de contato para cada cliente da lista.

![Untitled](../../img/discador-relatorios/discagens-por-contato.png)

* **Início:**
  Data de início da pesquisa no relatório.
* **Fim:**
  Data de fim da pesquisa no relatório.
* **Campanhas:**
  Seleciona a campanha de discador.
* **Listas:**
  Seleciona a lista conforme campanha selecionada no filtro de campanhas.

---

## Na Prática - Configurando o Infinity

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-configurando-o-infinity/

# Configurando o Infinity do Zero

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos de como configurar o Infinity desde o início.

Na Prática - Configurando o Infinity do Zero

---

## Na Prática - Ramais Administrativos

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-ramais-administrativos/

# Utilizando Ramais Administrativos

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos sobre como utilizar a tela de atendimento para os ramais do tipo administrativo, também conhecida como cockpit.

Na Prática - Utilizando Ramais Administrativos

---

## Na Prática - Atendente de Call Center

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-atendente-de-call-center/

# Utilizando Ramais de Call Center

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos de como utilizar a tela de atendimento para agentes de Call Center.

Na Prática - Utilizando Ramais de Call Center

---

## Na Prática - Painel de Ramais

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-painel-de-ramais/

# Painel de Atendimento para Telefonistas

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos sobre como utilizar o painel de Ramais, um recurso indispensável para telefonistas.

Na Prática - Painel de Atendimento para Telefonistas

---

## Na Prática - Monitoramento de Equipe

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-monitoramento-de-equipe-em-tempo-real/

# Monitoramento de Equipe em Tempo Real

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos de como monitorar sua equipe de atendentes de Call Center em tempo real, utilizando o Dashboard do Módulo de Call Center.

Na Prática - Monitoramento de Equipe em Tempo Real

---

## Na Prática - Utilizando o Discador

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-utilizando-o-discador/

# Utilizando o Discador

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos sobre como utilizar Discador automático.

Na Prática - Utilizando Ramais Administrativos

---

## Na Prática - Configuração Softphone Desktop

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-configuracao-softphone_desktop/

# Configurando o Softphone Desktop

No vídeo a seguir, você encontrará uma explicação de como configurar seu softphone Desktop.

Na Prática - Configurando o Softphone Desktop

---

## Na Prática - Configuração do PipeRun

**URL:** https://wiki.native-infinity.com.br/na-pratica/na-configuracao-do-piperun/

# Integrando Ramais ao PipeRun

No vídeo a seguir, você encontrará uma explicação detalhada e exemplos práticos sobre como configurar a integração do PipeRun para utilização dos ramais do Infinity na funcionalidade de click-to-call.

Na Prática - Integrando Ramais ao PipeRun

---

## Integração - PipeRun

**URL:** https://wiki.native-infinity.com.br/integracoes/piperun/

# CRM Piperun

Com a integração entre o **Native Infinity** e o **CRM Piperun**, sua equipe ganha mais agilidade e eficiência no atendimento. A funcionalidade de Click-to-Call permite que as ligações sejam feitas com apenas um clique direto do contato no CRM, eliminando etapas manuais e otimizando o tempo do time comercial.

Após cada chamada, todas as informações, incluindo a gravação, ficam automaticamente registradas no CRM, garantindo rastreabilidade, histórico completo de interações e melhor acompanhamento das oportunidades.

Além disso, é possível integrar o discador automático do Native Infinity com as listas do Piperun, conforme as etapas do funil de vendas. Isso permite uma abordagem mais estratégica, garantindo que os contatos certos sejam acionados no momento ideal.

**Resultado**: mais produtividade, melhor gestão das conversas e aumento nas taxas de conversão.

## Resumo das soluções disponíveis para a integração com o CRM Piperun

* Click-to-Call
* Gravação de dados da ligação na oportunidade
* Integração com discador

## Configurando o Piperun

Para essa integração, nenhuma configuração é necessária no Native Infinity. Veja abaixo como configurar o PipeRun:

Vídeo Aula

**1.** No canto superior direito da tela, clique no avatar da conta e depois em Ajustes.

![Untitled](../../img/integracoes/piperun/img1.png)

**2.** Na coluna Conta, clique em Configurações:

![Untitled](../../img/integracoes/piperun/img2.png)

**3.** Desça a tela até a opção Telefonia:

![Untitled](../../img/integracoes/piperun/img3.gif)

**4.** Preencha as informações e crie os ramais:

![Untitled](../../img/integracoes/piperun/img4.png)

* **Fornecedor de telefona (1)**: selecione a opção NativeIP

Em Criar Ramais:

* **Usuário (2)**: selecione o usuário do PipeRun que utiliza o ramal
* **URL (3)**: informe o domínio associado ao seu servidor do Native seguido pelo endpoint "**/api/piperunCall**" da API para receber as requisições do PipeRun. Por exemplo: se o seu domínio é **https://native.exemplo.com**, nesse campo você deverá preencher **https://native.exemplo.com/api/piperunCall**.
* **Nome de usuário (4)**: informe o usuário que o dono do ramal usa para se logar no Native.
* **Senha (5)**: informe a senha que o dono do ramal usa para se logar no Native.
* **Ramal (6)**: informe o número do ramal.

## Validando a Configuração

Para validar a configuração e iniciar as ligações a partir do PipeRun, acesse o cadastro de um cliente ou oportunidade e clique em qualquer campo que contenha um número de telefone.

Em seguida, selecione um dos ramais cadastrados para o seu usuário, escolhendo aquele que deseja utilizar para realizar a ligação.

![Untitled](../../img/integracoes/piperun/img5.png)

Clique em Chamar. Sua chamada será agendada e em breve o ramal selecionado irá tocar.

![Untitled](../../img/integracoes/piperun/img6.png)

Assim que você atender a ligação, o Native iniciará a ligação para o número de destino.

Dica

**IMPORTANTE**: É fundamental que o perfil do seu ramal permita o tipo de ligação que esteja tentando fazer e que a máscara configurada na rota de saída esteja adequada aos telefones cadastrados no CRM.

Ao final da ligação você poderá verificar as informações nas abas **Histórico** e **Ligações**. Se necessário, pressione F5 ou recarregue a página para atualizar as informações.

![Untitled](../../img/integracoes/piperun/img7.png)

## Configurando o Native Discador

**1.** Criar uma ação automática para adicionar/remover contato no discador:

![Untitled](../../img/integracoes/piperun/img8.jpg)

![Untitled](../../img/integracoes/piperun/img9.jpg)

Em:

* **NOME DO FUNIL**: selecionar o funil/pipeline que vai fazer a integração com o discador.
* **ETAPA DO FUNIL**: selecionar a etapa onde ficarão as oportunidades durante o processo de discagem.
* **Esta ação automática será executada sempre que**: selecionar “Uma oportunidade entrar na etapa selecionada” na ação de inclusão no discador e selecionar “Uma oportunidade sair da etapa selecionada” na ação de remoção do discador.
* **URL DO ENDPOINT (para inclusão no discador)**: https://DOMÍNIO\_DO\_CLIENTE/api/piperun/dialerAddContact
* **URL DO ENDPOINT (para remoção do discador)**: https://DOMÍNIO\_DO\_CLIENTE/api/piperun/dialerRemoveContact

Observação

Posteiromente também será necessário acessar o menu **Loja de Integrações** para realizar configurações adicionais para a utilização do discador com o Piperun.

---

## Integração - Pipedrive

**URL:** https://wiki.native-infinity.com.br/integracoes/pipedrive/

# CRM Pipedrive

Com a integração entre o **Native Infinity** e o **CRM Pipedrive**, sua equipe de vendas ganha agilidade e eficiência no atendimento. É possível realizar chamadas com apenas um clique diretamente do CRM, utilizando a funcionalidade Click-to-Call. Assim que a ligação é finalizada, todos os dados — incluindo tempo da chamada, número discado e até a gravação do áudio — ficam registrados automaticamente no histórico do contato, facilitando o acompanhamento e a tomada de decisões estratégicas.

**Resultado:** elimina tarefas manuais, garante mais controle sobre a performance dos vendedores e proporciona uma visão completa do relacionamento com o cliente, tudo dentro da própria plataforma de CRM.

## Resumo das soluções disponíveis para a integração com o CRM Pipedrive

* Click-to-Call
* Gravação de dados da ligação na oportunidade

## Como obter o token no Pipedrive

Para essa integração você precisará preencher o campo API Token em nossa loja de integrações Veja abaixo como obter o Token:

Para localizar o TOKEN do usuário, acesse o Pipedrive com o usuário administrador. Depois navegue através dos menus **Configurações > Preferências pessoais > API** e copie o texto que está no campo "Seu token de API pessoal":

![Untitled](../../img/integracoes/pipedrive/img1_pipedrive.png)

## Como associar o usuário do Pipedrive ao usuário do Native

É necessário que você faça a associação de um usuário do Pipedrive ao usuário do Native, para que no momento do click-to-call o Native possa localizar o ramal para direcionar a ligação.

Para isso, acese o menu Usuários do Native e clique no usuário que deseja editar ou crie um novo. Você verá um campo chamado Usuário Pipedrive que será preenchido com todos os usuário que estão cadastrados no seu CRM. Selecione o usuário que deseja associar.

![Untitled](../../img/integracoes/pipedrive/img2_pipedrive.png)

## Configurando o Pipedrive

Veja abaixo como configurar o Pipedrive:

**1.** No canto superior direito da tela, no avatar da conta, clique em Ferramentas e integrações:

![Untitled](../../img/integracoes/pipedrive/img3_pipedrive.png)

**2.** Configure o método de chamada:

![Untitled](../../img/integracoes/pipedrive/img4_pipedrive.png)

No menu **Ferramentas** à esquerda, selecione a opção **Caller** (1) e depois a aba **Pessoal** (2). Nessa tela iremos escolher no **Aplicativo de chamada padrão** (3) a opção **Personalizado** (4).

No campo que está em branco (6) preencheremos com o endpoint da API do Native **"/api/pipedriveCall"** responsável por fazer as ligações do Pipedrive, seguido dos parâmetros com os dados do CRM: "**?destination=[number]&deal=[deal\_id]&user=[user\_id]&person=[person\_id]&company=[org\_id]**".

Por exemplo:

Se o seu domínio é **https://native.exemplo.com**, nesse campo você deverá preencher **https://native.exemplo.com/api/pipedriveCall?destination=[number]&deal=[deal\_id]&user=[user\_id]&person=[person\_id]&company=[org\_id]**.

Em seguida clique em "Salvar configurações" logo abaixo.

## Validando a Configuração

Para validar a configuração e começar a fazer ligações a partir do Pipedrive, acesse o cadastro de um cliente/oportunidade e clique em qualquer campo que contenha um número de telefone.

Se paracer uma tela como a que está abaixo, basta selecionar as opções Método de ligação > Computador > Ligar com um aplicativo de ligação e clicar em Iniciar chamada e em breve o ramal do usuário irá tocar.

![Untitled](../../img/integracoes/pipedrive/img5_pipedrive.png)

Assim que você atender a ligação, o Native iniciará a ligação para o número de destino.

**IMPORTANTE:** É fundamental que o perfil do seu ramal permita o tipo de ligação que esteja tentando fazer e que a máscara configurada na rota de saída esteja adequada aos telefones cadastrados no CRM.

Ao final da ligação você poderá verificar as informações nas abas Tudo e Atividades. Se necessário, pressione F5 ou recarregue a página para atualizar as informações.

**Fontes:**

**1)** [Documentação Pipedrive API](https://pipedrive.readme.io/docs/how-to-find-the-api-token?ref=api_reference)

**2)** [Documentação Pipedrive VOIP](https://support.pipedrive.com/hc/pt-br/articles/207449505-Sintaxe-Callto-Fa%C3%A7a-liga%C3%A7%C3%B5es-VOIP-dentro-do-Pipedrive)

---

## Integração - Exact Sales

**URL:** https://wiki.native-infinity.com.br/integracoes/exactsales/

# CRM Exact Sales

A integração entre o **Native Infinity** e o **CRM Exact Sales** permite mais agilidade e produtividade no processo comercial. Com o recurso de Click-to-Call, é possível iniciar chamadas diretamente da plataforma do Exact Sales com apenas um clique sobre o número do contato.

Todas as informações da ligação, incluindo tempo de chamada, status e gravação de áudio, são automaticamente registradas no CRM assim que a ligação é finalizada. Isso garante mais controle sobre o histórico de interações com o lead, além de facilitar o acompanhamento da equipe e a análise de desempenho.

**Resultado:** otimizar seu fluxo de cadência, reduzir o tempo de resposta e aumentar a conversão de oportunidades em vendas.

## Resumo das soluções disponíveis para a integração com o Exact Sales

* Click-to-Call
* Gravação de dados da ligação na oportunidade

## Configurando o Exact Sales

Para essa integração, não é necessária nenhuma configuração no Native Infinity. Basta gerar um token e inseri-lo no Exact Sales. Confira abaixo como realizar a configuração no Exact Sales:

**1.** No canto inferior esquerdo da tela, clique em **Configurações**:

![Untitled](../../img/integracoes/exactsales/img1_exactsales.png)

**2.** Na tela de Configurações, localize a sessão **Integrações**, clique em **Token exact API**:

![Untitled](../../img/integracoes/exactsales/img2_exactsales.png)

**3.** Marque as opções **Habilitar coleta de Resultado das Ligações** e **Utilizar a API da Central Telefônica**. Em seguida, configure os campos **URL da Central Telefônica** e **Token de Autenticação**:

![Untitled](../../img/integracoes/exactsales/img3_exactsales.png)

* **URL da Central Telefônica**: informe o domínio associado ao seu servidor do Native seguido pelo endpoint "**/api/exactsalesCall**" da API para receber as requisições do ExactSales.

  Por exemplo:

  Se o seu domínio é **https://native.exemplo.com**, nesse campo você deverá preencher **https://native.exemplo.com/api/exactsalesCall**.
* **Token de Autenticação**: informe o token gerado na loja de integrações do Native Infinity.

![Untitled](../../img/integracoes/exactsales/img5_exactsales.png)

**4.** Configure os ramais dos usuários acessando o seu perfil, clique em **Sua conta**. No campo **Telefone 1** insira o número do seu ramal:

![Untitled](../../img/integracoes/exactsales/img4_exactsales.png)

---

## Integração - Simples

**URL:** https://wiki.native-infinity.com.br/integracoes/simples/

# CRM Simples

A integração com o CRM Simples permite realizar chamadas diretamente pela plataforma (Click-to-Call), com praticidade e agilidade. Todas as informações da ligação, incluindo data, horário e duração, são automaticamente registradas no CRM, facilitando o acompanhamento e o histórico de contatos.

**Resultado**: mais produtividade, melhor gestão das conversas e aumento nas taxas de conversão.

## Resumo das soluções disponíveis para a integração com o CRM Simples

* Click-to-Call
* Gravação de dados da ligação na oportunidade

## Configurando o CRM Simples

**1.** Acesse o menu "**Configurações**" > "**Minha Conta - NOME DA EMPRESA**":

![Untitled](../../img/integracoes/simples/img1_simples.jpeg)

**2.** Habilite a flag "**Conta Integrada com a Central Telefônica**" e preencha o campo "**Host do serviço**" com o endereço do Native seguido do endpoint "**/api/crmsimples/call**".

Por exemplo: **https://native.seudiminio.com/api/crmsimples/call**

**3.** Em seguida, crie os dispositivos com os números dos ramais já cadastrados no Native Infinity

![Untitled](../../img/integracoes/simples/img2_simples.jpeg)

**4.** Acesse o menu "**Adminstrador**" na aba "**API**" e copie o token para ser usado na agina da loja de integrações do Native Infinity

![Untitled](../../img/integracoes/simples/img3_simples.jpeg)

Observação

Caso necessário, consulte o suporte do CRM Simples para fazer a configuração do ambiente.

---

## Integração - Uneinternet

**URL:** https://wiki.native-infinity.com.br/integracoes/uneinternet/

# CRM Une Internet

A integração com o **CRM Une Internet** oferece duas funcionalidades poderosas para otimizar o atendimento:

* Identificação automática do cliente pelo número de telefone, agilizando o reconhecimento do contato no momento da chamada.
* Click-to-Call direto pelo CRM, permitindo que as ligações sejam feitas com apenas um clique, sem a necessidade de discagem manual.

**Resultado:** maior agilidade e automação no atendimento.

## Resumo das soluções disponíveis para a integração com o CRM Une Internet

* Identificação do cliente pelo número de telefone
* Click-to-Call

## Configurando o Native Infinity

Para configurar essa integração, será necessário informar a URL do CRM Une Internet na **Loja de Integrações** do Native Infinity.

![Untitled](../../img/integracoes/uneinternet/img1_uneinternet.png)

Observação

Já a configuração no ambiente do CRM Une Internet deve ser realizada com o apoio do suporte da própria Une Internet.

Fico no aguardo das suas instruções.

---

## Integração - Voalle

**URL:** https://wiki.native-infinity.com.br/integracoes/voalle/

# ERP Voalle

Com a integração entre o **Native Infinity** e o **ERP Voalle**, seu atendimento se torna ainda mais ágil, inteligente e conectado. Unimos a eficiência da comunicação via telefonia com o poder da gestão de informações do Voalle, proporcionando uma experiência completa para seus agentes e clientes.

Principais benefícios da integração:

* Realize chamadas diretamente a partir do sistema com apenas um clique, sem a necessidade de discagem manual.
* Ao receber uma ligação, o sistema exibe automaticamente na tela do atendente os dados do cliente, agilizando o atendimento e reduzindo o tempo de resposta.
* As informações das chamadas são registradas diretamente no cadastro do cliente, garantindo rastreabilidade e histórico de atendimento.
* Identifique clientes rapidamente através do CPF, CNPJ, telefone ou código de assinante.
* Solicite segunda via de boletos, desbloqueios em confiança e abertura de tickets diretamente pelo sistema, sem precisar acessar outros ambientes.
* Verifique falhas no POP, bloqueios de conexão por pendência financeira e o status da conexão dos clientes em poucos cliques.

**Resultado**: Maior produtividade para sua equipe, redução no tempo de atendimento e uma experiência muito mais satisfatória para seu cliente!

## Resumo das soluções disponíveis para a integração com o ERP Voalle

* Click-to-Call
* Gravação de dados da ligação no cadastro do cliente
* Identificação por CPF, CNPJ, Telefone ou Código de Assinante
* Emissão de segunda via de boleto
* Consulta de bloqueios por pendências financeiras
* Desbloqueio de conexão em confiança
* Abertura de de protocolo de falha de conexão
* Abertura de protocolo de falha de desbloqueio
* Geração de nova solicitação
* Encerramento de solicitação
* Verificação de falhas em POPs
* Consulta de status de conexão
* Exibição de popup de atendimento

## Configurando o Voalle

No Voalle acesso o caminho: Configurações / Parâmetros > Menu - PBX

Apesar de aparecer o nome "NativeIP" nas opções do Voalle, para o Native Infinity deve-se selecionar o nome "Default" conforme a tela abaixo:

![Untitled](../../img/integracoes/voalle/img1_voalle.jpg)

* **Nome**: Habilita os campos relacionados à configuração de um PBX padrão. Escolha Default.
* **Ip**: Insira a URL do seu servidor seguido do endpoint "**/api/voalle**".

  Por exemplo: "**https://seunative.native-infinity.com.br/api/voalle**"
* **Usuário (API)**: Usuário de acesso ao Native **(Não obrigatório)**
* **Senha (API)**: Senha de acesso ao Native **(Não obrigatório)**
* **IP de Acesso**: Endereços liberados para consulta nos endpoints da API. É importante salientar que esse não é um parâmetro obrigatório. Se nenhum IP for informado, então qualquer IP pode realizar as consultas da API de PBX da Voalle. Mas no momento que um IP for informado, apenas os IPs informados serão liberados para fazer as consultas. Erros nas chamadas da API de PBX desta integração, onde a resposta recebida é um HTML, podem ser explicados por essa falta de liberação. Ao inserir múltiplos IPs, eles devem ser separados por vírgula
* **Modelo de e-mail para envio de 2ª Via**: Modelo usado pela API de PBX da Voalle para enviar a segunda via do boleto do cliente

## Atribuindo usuários aos ramais do Native

Para atribuir os usuários de cada ramal, use a rotina Service Desk / Utilitários / PBX - Extensões:

![Untitled](../../img/integracoes/voalle/img2_voalle.png)

## Configurando o Native Infinity

Após realizar as devidas configurações em seu Voalle, também é necessário informar a URL e o Token da API diretamente na Loja de Integrações.

![Untitled](../../img/integracoes/voalle/img3_voalle.png)

Observação

Caso possua mais de uma base Voalle, é possível adicionar novas bases diretamente na Loja de Integrações, clicando no botão "Adicionar Voalle"

**Fontes**:

[Documentação Voalle API (PABX/Omnichannel)](https://documenter.getpostman.com/view/16282829/TzskChRy)

[Documentação Voalle API (Para terceiros)](https://documenter.getpostman.com/view/16282829/TzzBqFw1)

---

## Integração - MK Solutions

**URL:** https://wiki.native-infinity.com.br/integracoes/mksolutions/

# ERP MK Solutions

A integração do **Native Infinity** com o **ERP MK Solutions** permite centralizar e automatizar processos fundamentais do atendimento, proporcionando maior agilidade, controle e eficiência operacional. Por meio de consultas via API ou banco de dados, é possível acessar informações relevantes do cliente em tempo real, além de realizar solicitações diretamente pela interface do sistema.

**Resultado**: Essa integração melhora a experiência do cliente final e otimiza o tempo de atendimento, reduzindo erros operacionais e dando maior autonomia aos atendentes.

## Resumo das soluções disponíveis para a integração com o ERP MK Solutions

* Identificação de cliente por CPF, CNPJ ou Telefone
* Emissão de segunda via de boleto por E-mail e SMS
* Desbloqueio em confiança
* Abertura de lead
* Abertura de ticket/incidente
* Atualização de telefone no cadastro
* Criação de novo pré-cadastro
* Verificação de Ordens de Serviço abertas
* Verificação de falha no POP
* Verificação de conexão bloqueada ou com pendência financeira

## Configurando o MK Solutions

Crie um usuário para integração e localize o seus dados:

**1.** Token:

![Untitled](../../img/integracoes/mksolutions/img1_mk.png)

**2.** Contra senha:

![Untitled](../../img/integracoes/mksolutions/img2_mk.png)

**3.** Verificar os serviços liberados:

![Untitled](../../img/integracoes/mksolutions/img3_mk.png)

## Configurando o Native Infinity

Após obter essas informações, é necessário preencher os dados solicitados na Loja de Integrações do Native Infinity:

![Untitled](../../img/integracoes/mksolutions/img4_mk.png)

Observação

Ao realizar o preenchimento desses campos, será necessário solicitar à MK a liberação do IP do servidor Native Infinity para acesso ao banco de dados, garantindo o funcionamento adequado de determinadas funcionalidades.

Caso possua mais de uma base MK, é possível adicionar novas bases diretamente na Loja de Integrações, clicando no botão "Adicionar MK"

**Fontes**:

[Documentação do MK Solutions](https://mkloud.atlassian.net/wiki/spaces/MK30/overview)

---

## Integração - IXCSoft

**URL:** https://wiki.native-infinity.com.br/integracoes/ixcsoft/

# ERP IXC Soft

A integração do **Native Infinity** com o **IXC Soft** oferece uma experiência completa e automatizada para atendimento ao cliente, unificando operações e otimizando o fluxo de informações entre os sistemas. Por meio de consultas via API, é possível obter dados em tempo real, além de realizar ações diretamente a partir da interface do Native Infinity, como abertura de tickets e envio de segunda via de boletos. A integração também permite interação com incidentes e operações relacionadas à rede, proporcionando mais agilidade e controle.

**Resultado**: Essa integração melhora a experiência do cliente final e otimiza o tempo de atendimento, reduzindo erros operacionais e dando maior autonomia aos atendentes.

## Resumo das soluções disponíveis para a integração com o ERP IXC Soft

* Identificação automática do cliente por CPF, CNPJ ou telefone
* Envio de segunda via de boleto por e-mail e SMS
* Desbloqueio de conexão em confiança
* Abertura e atualização de tickets
* Abertura de leads
* Verificação de Ordens de Serviço abertas
* Liberação de redução de velocidade da conexão
* Verificação de bloqueios por pendência financeira
* Diagnóstico de falhas no POP (com integração ao INMAP)

## Configurando o IXC Soft

É necessário criar um usuário para que seja utilizado para a integação.

**1.** Para cadastrar um novo usuário devemos acessar o menu **Configurações do Sistema > Usuários > Usuários > Novo**, conforme imagem abaixo:

![Untitled](../../img/integracoes/ixcsoft/img1_ixcsoft.png)

**2.** Após clicar em Novo devemos preencher os campos de Grupo **/ Nome / E-mail / Senha / Status**, marcar a flag "**Permite acesso ao webservice**" e clicar em Salvar.

![Untitled](../../img/integracoes/ixcsoft/img2_ixcsoft.png)

**3.** Copie a **Base URL** e o **Token de Acesso** para utilizá-lo na Loja de Integrações do Native Infinity e estabelecer a conexão com o IXC.

![Untitled](../../img/integracoes/ixcsoft/img3_ixcsoft.png)

Observação

Após o preenchimento desses campos, será necessário liberar o IP do servidor Native Infinity para que ele tenha acesso às funcionalidades do IXC, garantindo o funcionamento adequado de determinadas operações.

Caso você possua mais de uma base IXC, é possível adicioná-las diretamente na Loja de Integrações, clicando no botão "Adicionar IXC"

**Fontes**:

[Documentação IXCSOFT Wiki](https://wikiapiprovedor.ixcsoft.com.br/#)

[Documentação IXCSOFT API](https://wiki.ixcsoft.com.br/pt-br/API/como_gerar_um_token_para_integra%C3%A7%C3%B5es_API)

---

## Integração - RBXSoft

**URL:** https://wiki.native-infinity.com.br/integracoes/rbxsoft/

# ERP RBX Soft

A integração do **Native Infinity** com a **RBX Soft** permite a consulta de informações e a execução de ações diretamente por meio de API ou acesso ao banco de dados, proporcionando agilidade e automação nos processos de atendimento e gestão de clientes. Entre as funcionalidades disponíveis, destacam-se operações como abertura de incidentes e solicitação de segunda via de boletos, otimizando a experiência do usuário final e reduzindo a carga operacional.

**Resultado**: potencializa a eficiência operacional e a experiência do cliente ao automatizar processos como consultas, abertura de atendimentos e envio de boletos, resultando em redução de custos, aumento da produtividade, maior agilidade nas soluções e um diferencial competitivo para empresas que buscam inovação no atendimento.

## Resumo das soluções disponíveis para a integração com o ERP RBX Soft

* Identificação de clientes por CPF ou CNPJ
* Envio de segunda via de boletos por e-mail ou SMS
* Desbloqueio temporário por confiança
* Verificação de status de conexão e existência de pendências financeiras
* Abertura e encerramento de atendimentos técnicos ou administrativos

## Configurando o RBX

Crie um usuário para integração e localize seus dados nas configurações de usuário. Será necessário utilizar o token.

## Configurando o Native

Após obter o token, será necessário preencher os campos disponíveis na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/rbxsoft/img1_rbx.png)

---

## Integração - Hubsoft

**URL:** https://wiki.native-infinity.com.br/integracoes/hubsoft/

# ERP Hub Soft

A integração entre a **Native Infinity** e o **Hub Soft** permite a consulta de informações e execução de ações diretamente via API, proporcionando mais agilidade e automação nos processos de atendimento ao cliente. Além de funcionalidades como abertura e interação em tickets, envio de segunda via de boletos e desbloqueios em confiança, a integração também possibilita a exibição de pop-ups na tela do operador sempre que uma ligação é recebida, otimizando o atendimento e tornando-o mais contextual e eficiente.

**Resultado**: promove maior eficiência operacional e melhora a experiência do cliente ao automatizar tarefas rotineiras, como consultas e atendimentos, resultando em redução de custos, aumento da produtividade, agilidade nas soluções e um atendimento mais inteligente e personalizado.

## Resumo das soluções disponíveis para a integração com o ERP Hub Soft

* Identificação automática de clientes por CPF, CNPJ ou Telefone
* Envio de segunda via de boletos
* Desbloqueio por confiança
* Abertura de tickets
* Verificação de Ordens de Serviço abertas
* Verificação de falhas no POP (Ponto de Presença)
* Consulta sobre status de conexão e existência de pendências financeiras
* Exibição de pop-up com dados do cliente

## Configurando o Native

Na Loja de Integrações do Native Infinity, preencha os campos necessários:

![Untitled](../../img/integracoes/hubsoft/im1_hubsoft.png)

Observação

Caso possua mais de uma base Hubsoft, é possível adicionar novas bases diretamente na Loja de Integrações, clicando no botão "Adicionar Hubsoft"

**Fonte**:

[Documentação Hubsoft](https://docs.hubsoft.com.br)

---

## Integração - Elitesoft

**URL:** https://wiki.native-infinity.com.br/integracoes/elitesoft/

# ERP Elite Soft

A integração entre o **Native Infinity** e o **ERP Elite Soft** permite automatizar e centralizar ações essenciais de atendimento ao cliente, por meio de consultas e comandos via API. Entre as funcionalidades disponíveis estão validação de documentos, emissão de segunda via de boletos, desbloqueio temporário em confiança e abertura de tickets. Também é possível consultar status de conexão, falhas no POP e pendências financeiras, otimizando a atuação da equipe de suporte com informações em tempo real.

**Resultado**: Essa integração proporciona um atendimento mais ágil e eficiente, com redução de custos operacionais, aumento da produtividade da equipe e melhoria na experiência do cliente, ao oferecer respostas mais rápidas, assertivas e automatizadas.

## Resumo das soluções disponíveis para a integração com o ERP Elite Soft

* Identificação por CPF ou CNPJ
* Envio de segunda via de boletos
* Desbloqueio por confiança
* Abertura de tickets
* Verificação de falhas no POP
* Consulta sobre conexões bloqueadas ou com pendências financeiras
* Monitoramento do status da conexão do cliente

## Configurando o Elite Soft

Consulte a documentação do Elite Soft para realizar as configurações necessárias na plataforma.

Para visitar página da documentação Elite Soft, **[clique aqui.](https://api.elitesoft.com.br/)**

Observação

Para utilizar a API, é necessário solicitar o usuário e senha à Elite. No momento da solicitação, informe o IP do servidor, pois essa informação é necessária para que a Elite possa liberar o acesso.

## Configurando o Native

Após obter a Base URL e cadastrar o usuário e a senha, preencha a Loja de Integrações do Native Infinity com essas informações.

![Untitled](../../img/integracoes/elitesoft/img1_elite.png)

---

## Integração - SGP

**URL:** https://wiki.native-infinity.com.br/integracoes/sgp/

# ERP SGP

A integração com o **ERP SGP** possibilita a consulta de informações e a execução de ações diretamente via API, trazendo mais agilidade e automação aos processos de atendimento ao cliente. Permitindo identificação do cliente com base em CPF, CNPJ, telefone ou código de assinante, verificação de inadimplência, emissão de segunda via de boletos, realização de desbloqueios em confiança e avisos de falha massiva.

**Resultado**: mais produtividade, melhor gestão das conversas e aumento nas taxas de conversão.

## Resumo das soluções disponíveis para a integração com o ERG SGP

* Identificação de cliente por CPF/CNPJ/Telefone/Código de assinante
* Identificação de clientes inadimplentes
* Segunda via de boleto
* Desbloqueio em confiança
* Envio de segunda via
* Aviso de falha massiva
* Integração com o módulo cobrança

## Configurando o ERP SGP

**1.** Consulte o suporte do software para fazer a configuração do ambiente e para obter o Token.

[Documentação API SGP](https://documenter.getpostman.com/view/6682240/UzXKVyUs)

[Documentação de Autenticação](https://bookstack.sgp.net.br/link/101#bkmrk-02-%7C-token-e-app)

**2.** Após obter o token, será necessário preencher os campos disponíveis na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/sgp/sgp_token.png)

---

## Integração - eDesk

**URL:** https://wiki.native-infinity.com.br/integracoes/edesk/

# Servicedesk Edesk

A integração entre o **Native Infinity** e o **Service Desk E-Desk** proporciona uma experiência de atendimento mais eficiente e automatizada, permitindo que o cliente seja identificado automaticamente por telefone ou ramal, com a abertura automática de solicitações diretamente no sistema E-Desk.

Além disso, a gravação da ligação é anexada automaticamente à solicitação, assegurando rastreabilidade e histórico detalhado do atendimento. A equipe ainda pode selecionar o tipo de solicitação no momento da interação, garantindo mais organização e assertividade na gestão dos chamados.

**Resultado**: mais agilidade nos processos, redução de falhas operacionais e um atendimento mais estruturado e profissional.

## Resumo das soluções disponíveis para a integração com o Service Desk E-Desk

* Identificação automática do cliente por telefone/ramal
* Abertura automática de solicitações
* Gravação da ligação vinculada à solicitação
* Seleção de tipo de solicitação direto no atendimento

## Configurando o E-desk

Para saber mais sobre como configruar a integração do E-desk, consulte o suporte do E-desk.

---

## Integração - Movidesk

**URL:** https://wiki.native-infinity.com.br/integracoes/movidesk/

# Servicedesk Movidesk

A integração entre o **Native Infinity** e o **Service Desk Movidesk** potencializa a gestão de atendimento ao cliente ao automatizar a abertura de tickets assim que uma chamada é atendida. Além disso, a gravação da ligação é vinculada automaticamente ao ticket ao término da chamada, garantindo rastreabilidade e histórico completo do atendimento.

**Resultado**: otimização do tempo da equipe, como também assegura maior organização, controle e qualidade nos processos de suporte.

## Resumo das soluções disponíveis para a integração com o Service Desk Movidesk

* Abertura automática de solicitação
* Gravação da ligação na solicitação
* Controle de ligações atendidas/perdidas
* Click-to-Call

## Configurando o Movidesk

**Como Obter o Token no Movidesk**

Para localizar o TOKEN do usuário, acesse o Movidesk com o usuário administrador. Depois navegue pelo menu **Configurações (1)** > **Contas** > **Parâmetros (2)**:

![Untitled](../../img/integracoes/movidesk/img1_movidesk.png)

Role até o final da página e copie o valor que aparece em "**Chave de API**":

![Untitled](../../img/integracoes/movidesk/img2_movidesk.png)

Observação

**IMPORTANTE**: Caso a chave seja gerada novamente esse parâmetro deverá ser substituído no Native também.

## Como Associar o usuário do Movidesk ao ramal do Native

É necessário que você faça a associação de um usuário do Movidesk ao ramal do Native, para que no momento da ligação o Movidesk possa exibir a informação para o usuário correto.

Para isso, acese o menu Pessoas do Movidesk:

![Untitled](../../img/integracoes/movidesk/img3_movidesk.png)

Selecione o usuário que deseja editar, navegue até a sessão Outros contatos e insira um novo ramal colocando o ramal do usuário:

![Untitled](../../img/integracoes/movidesk/img4_movidesk.png)

## Como configurar uma fila de atendimento no Marketing

Acese o menu Grupos de telefonia do Movidesk:

![Untitled](../../img/integracoes/movidesk/img5_movidesk.png)

Configure um nome para o grupo de telefonia, recomenda-se o mesmo nome da fila do Native Infinity, e coloque no "**Id da fila**" o número do ramal da fila:

![Untitled](../../img/integracoes/movidesk/img6_movidesk.png)

Não é necessário fazer as demais configurações pois o controle da fila é feito no Native Infinity.

## Configurando o Native Infinity

Após realizar toda a configuração necessária em seu Movidesk preencha o compo Token na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/movidesk/img7_movidesk.png)

**Fontes**:

[Movidesk - Telefonia - Sem controle da fila](https://atendimento.movidesk.com/kb/article/32178/api-do-movidesk-telefonia-sem-controle-da-fila)

[Movidesk - Telefonia - Recebendo chamadas](https://atendimento.movidesk.com/kb/article/18581/telefonia-pabx?menuId=9888-29139-18581&ticketId=&q=)

[Movidesk - Telefonia - Realizando chamadas](https://atendimento.movidesk.com/kb/article/55935/telefonia-chamada-ativa)

---

## Integração - Milvus

**URL:** https://wiki.native-infinity.com.br/integracoes/milvus/

# Servicedesk Milvus

A integração entre o **Native Infinity** e a **Service Desk Milvus** conecta o atendimento telefônico à gestão de chamados de forma inteligente e eficiente. Com funcionalidades como Click-to-Call e acesso direto a informações de clientes e tickets, os atendimentos tornam-se mais ágeis, organizados e produtivos. A centralização das ações reduz o tempo de resposta e melhora significativamente a experiência do cliente.

**Resultado**: mais agilidade no atendimento, maior controle das interações e processos automatizados para equipes de suporte mais produtivas.

## Resumo das soluções disponíveis para a integração com o Service Desk Milvus

* Realização de chamadas com um clique (Click-to-Call)
* Consulta de dados do cliente por CPF, CNPJ ou telefone
* Listagem de tickets em aberto vinculados ao cliente
* Criação de novos tickets diretamente pelo sistema
* Atualização de tickets de forma prática e rápida

## Configurando o Milvus

Acesse o menu "**Configurações**" > "**Token de API (1)**" e clique no botão "**Nova chave (2)**":

![Untitled](../../img/integracoes/milvus/img1_milvus.png)

Escolha um nome para a chave e clique em **Salvar**

![Untitled](../../img/integracoes/milvus/img2_milvus.png)

Em seguida, copie a chave gerada e cole no campo abaixo.

Caso necessário, consulte o suporte do Milvus para fazer a configuração do ambiente.

## Configurando o Native Infinity

Após realizar toda a configuração necessária em seu Milvus preencha o compo Token na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/milvus/img3_milvus.png)

**Fonte**:

[Documentação Api Milvus](https://developers.milvus.com.br/#api-_)

---

## Integração - Useall

**URL:** https://wiki.native-infinity.com.br/integracoes/useall/

# Servicedesk Useall

A integração entre o **Native Infinity** e o **Service Desk Useall** oferece uma comunicação inteligente com os sistemas da distribuidora, permitindo automatizar e agilizar atendimentos relacionados ao fornecimento de energia. Por meio dessa integração, é possível identificar situações críticas da unidade consumidora (UC), consultar desligamentos programados, recuperar informações financeiras e gerar protocolos de atendimento diretamente pelo sistema.

**Resultado**: maior eficiência operacional, redução no tempo médio de atendimento e padronização dos processos de suporte ligados ao fornecimento de energia.

## Resumo das soluções disponíveis para a integração com o Service Desk Useall

* Consulta de UC desligada
* Identificação automática da UC
* Geração de protocolo diretamente pela interface
* Verificação de desligamentos programados
* Consulta de UC com ordem de corte ou documento PDF associado
* Recuperação de faturas pendentes
* Identificação de queda de energia na unidade

## Configurando o Useall

Consulte o suporte do Useall para fazer a configuração do ambiente.

## Configurando o Native Infinity

Após realizar toda a configuração necessária em seu Useall preencha o compo URL e Token na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/useall/img1_useall.png)

---

## Integração - Zendesk

**URL:** https://wiki.native-infinity.com.br/integracoes/zendesk/

# Servicedesk Zendesk

A integração entre o **Native Infinity** e o **Service Desk Zendesk** eleva o nível de eficiência no atendimento ao cliente ao permitir a identificação automatizada do cliente ainda na URA e a abertura de tickets diretamente no ambiente do Zendesk, por meio de um app exclusivo integrado ao sistema.

Com essa conexão, sua equipe ganha agilidade no registro de chamados e maior assertividade nas interações, além de uma visão mais completa do histórico do cliente, tudo sem sair da plataforma de atendimento.

**Resultado**: maior produtividade da equipe, padronização dos processos de suporte e uma experiência mais fluida e eficaz para o cliente.

## Resumo das soluções disponíveis para a integração com o Service Desk Zendesk

* APP integrado ao Infinity
* Abertura de ticket

## Configurando o Zendesk

Consulte a documentação da API para gerar um token de API.

[Documentação API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API#topic_g4q_km1_2yb)

## Configurando o Native Infinity

Após realizar toda a configuração necessária em seu Zendesk preencha o compo URL, Usuário e senha na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/zendesk/img1_zendesk.png)

---

## Integração - ZapContábil

**URL:** https://wiki.native-infinity.com.br/integracoes/zapcontabil/

# Omnichannel Zap Contabil

A integração com o **Zap Contábil** permite realizar chamadas diretamente pela plataforma (Click-to-Call), com praticidade e agilidade. Todas as informações da ligação, incluindo tudo o que foi tratado com o cliente, facilitando o acompanhamento e o histórico de contatos.

**Resultado**: mais produtividade, melhor gestão das conversas com o cliente.

## Resumo das soluções disponíveis para a integração com o Zap Contábil

* Click-to-Call
* Gravação de dados da ligação.

## Configurando o Zap Contábil

### 1. Gerando chave de API:

Acesse o Zap Contábil e navegue até o menu "**Configurações**".

![Untitled](../../img/integracoes/zap/zap1.png)

Na página que irá abrir selecione "**INTEGRAÇÃO**" e em "**Chaves de API**" clique no botão "**GERAR NOVA CHAVE**". Coloque o nome de "Native" e clique em adicionar. Com a chave gerada, copie a mesma e guarde para mais tarde configurar dentro do Native:

![Untitled](../../img/integracoes/zap/zap2.png)

### 2. Configurando o iFrame:

Dentro da mesma página que estava acessando no *'Passo 1'*, navegue até encontrar "**Iframes**" e clique em "**ADICIONAR IFRAME**":

![Untitled](../../img/integracoes/zap/zap3.png)

Preencha com os seguintes dados:

**Nome:**

```
Native Infinity
```

**URL:**

```
https://seudominio.native-infinity.com.br/iframe/zappy/zappy.php?contactId={contactId}&userId={userId}
```

**Largura:**

```
320
```

*Exemplo*

![Untitled](../../img/integracoes/zap/zap4.png)

Observação

Caso necessário, consulte o suporte do Zap Contabil para fazer a configuração do ambiente.

## Configurando o Native:

### 1. Configurando integração:

Acesso o Native Infinity, acesse o menu "**Configurações**", depois acesse "**🛒 Loja de Integrações**" e localize pela integração do Zap Contábil e clique em "**Configurar**".

![Untitled](../../img/integracoes/zap/zap5.png)

Em "**Configuração API**" no campo URL será necessário preencher a URL do seu Zap Contábil, contudo é necessário adicionar "api-" antes da URL.
Exemplo: Se você acessa o Zap Contábil pelo endereço `https://exemplo.zapcontabil.chat` será necessário preencher com `https://api-exemplo.zapcontabil.chat`.
No campo Token preencha com o token gerado na parte 1.

*Exemplo:*

![Untitled](../../img/integracoes/zap/zap6.png)

### 2. Configurando Iframe:

Solicite ao suporte da Native concluir a configuração do Iframe dentro do seu servidor.

---

## Integração - PipeRun Omni

**URL:** https://wiki.native-infinity.com.br/integracoes/piperun_omni/

# Omnichannel Piperun

A integração entre o **Native Infinity** e o **Omnicahnnel Piperun Atendimento** transforma a telefonia em mais um canal nativo da plataforma, proporcionando uma experiência omnicanal fluida e centralizada. Com essa união, as interações por telefone passam a fazer parte do fluxo de atendimento do Piperun, ampliando a visibilidade e o controle sobre o relacionamento com o cliente.

A integração permite localizar automaticamente o solicitante pelo número de telefone, CPF ou CNPJ, além de contar com um softphone embarcado na aplicação, facilitando chamadas diretas. Todas as ligações ficam registradas na timeline do cliente, garantindo rastreabilidade e histórico completo.

**Resultado**: mais controle, agilidade e histórico consolidado de atendimento, tudo em uma única plataforma.

## Resumo das soluções disponíveis para a integração com o Omnichannel Piperun Atendimento

* Localização automática de solicitante por telefone, CPF ou CNPJ
* Softphone integrado diretamente à interface do Piperun
* Registro das ligações na timeline do cliente

## Configurando o Piperun Atendimento

**1.** Acesse o menu "**Cadastros restritos**" > "**Canais de Softphone**" e clique em "**Adicionar**":

![Untitled](../../img/integracoes/piperun/img1_piperun_omni.png)

**2.** Preencha os campos:

![Untitled](../../img/integracoes/piperun/img2_piperun_omni.png)

* **Descrição**: com o nome da integração. Apenas descritivo.
* **Host**: com o valor **'wss://SEUDOMINIO/ws'**. Onde **'SEUDOMÍNIO'** é o domínio do seu Native Infinity.
* **Domínio**: domínio do seu Native Infinity.
* **Usuário**: usuário com permissão de administrador no Native Infinity.
* **Senha**: senha do usuário.
* **Ativo**: marcar como SIM.

**3.** Em seguida, associe os ramais aos usuários

Acesse o menu "**Controle de acesso**" > "**Agentes**" e edite o usuário.

![Untitled](../../img/integracoes/piperun/img3_piperun_omni.png)

**4.** O Piperun Atendimento irá carregar os ramais que estão cadastrados no Native. Selecione o ramal que desejar e salve as configurações

![Untitled](../../img/integracoes/piperun/img4_piperun_omni.png)

## Configurando o Native Infinity

Após realizar a configuração do Piprun Atendimento, informe a URL diretamente na Loja de Integrações do Native Inifnity.

![Untitled](../../img/integracoes/piperun/img5_piperun_omni.png)

---

## Integração - Zenvia

**URL:** https://wiki.native-infinity.com.br/integracoes/zenvia/

# Omnichannel Piperun

A integração entre o **Native Infinity** e a **Zenvia** adiciona a funcionalidade de envio automatizado de SMS diretamente pela URA, permitindo uma comunicação mais ágil, direta e eficiente com os clientes durante o atendimento telefônico.

Com essa integração, é possível enviar mensagens com informações relevantes como protocolos, confirmações ou orientações, tudo isso em tempo real e de forma personalizada, otimizando o fluxo de atendimento e melhorando a experiência do cliente.

**Resultado**: aumento na eficiência da comunicação, redução de retrabalho e mais praticidade para o cliente ao receber informações importantes diretamente no celular.

## Resumo das soluções disponíveis para a integração com o Omnichannel Zenvia

* Envio de SMS automatizado via URA

## Configurando o Zenvia

Consulte o suporte do software para fazer a configuração do ambiente.

[Documentação API Zenvia](https://zenvia.github.io/zenvia-openapi-spec/v2/#section/Overview)

## Configurando o Native Infinity

Após realizar toda a configuração necessária no Zenvia preencha o compo URL e Token na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/zenvia/img1_zenvia.png)

---

## Integração - MatrixGo

**URL:** https://wiki.native-infinity.com.br/integracoes/matrixgo/

# Omnichannel Matrix Go

A integração entre o **Native Infinity** e o **Matrix Go** transforma a telefonia em um canal ainda mais inteligente ao permitir o envio automático de mensagens via WhatsApp diretamente pela URA. Essa funcionalidade amplia as possibilidades de interação com o cliente, utilizando um dos canais de comunicação mais utilizados e acessíveis do mercado.

Com ela, é possível enviar mensagens durante ou após uma ligação, reforçando informações importantes, confirmando atendimentos ou orientando o usuário de forma prática e eficiente.

**Resultado**: melhoria significativa na comunicação com os clientes, aumento na taxa de contato e fortalecimento da experiência omnichannel.

## Resumo das soluções disponíveis para a integração com o Omnichannel Matrix Go

* Envio de mensagens via WhatsApp pela URA

## Configurando o Matrix OMNI

Consulte o suporte do software para fazer a configuração do ambiente

[Documentação API Matrix Go](https://developers.matrixgo.ai/docs/omini-presentation)

## Configurando o Native Infinity

Após realizar toda a configuração necessária no Matrix Go preencha o compo URL e Token na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/matrixgo/img1_matrixgo.png)

---

## Integração - Silber

**URL:** https://wiki.native-infinity.com.br/integracoes/silber/

# Cobrança Silber

A integração entre o **Native Infinity** e a plataforma de cobrança **Silber** permite incorporar a telefonia diretamente ao fluxo de atendimento do sistema. Com a funcionalidade de Click-to-Call, é possível realizar chamadas diretamente a partir do cadastro do cliente na plataforma. Além disso, as informações da ligação — como o áudio e os dados do atendimento — são automaticamente registradas na solicitação, garantindo rastreabilidade e histórico completo de interações.

**Resultado**: mair controle sobre os atendimentos de cobrança, com ganho de produtividade e centralização das interações, reduzindo retrabalho e facilitando o acompanhamento das ações realizadas.

## Resumo das soluções disponíveis para a integração de cobrança Silber

* Click-to-Call (chamada direta pelo sistema)
* Gravação e registro da ligação na solicitação.

## Configurando o Silber - SBI

Procure o suporte da Silber para proceder com a configuração.

## Configurando o Native Infinity

Após configurar o Silber preencha a URL, usuário e senha na Loja de Integrações do Native Infinity

![Untitled](../../img/integracoes/silber/img1_silber.png)

**Fontes**:

[Documentação API Silber](https://api.appserver.silberinfo.com.br/native)

---

## Integração - 7az

**URL:** https://wiki.native-infinity.com.br/integracoes/7az/

# Cobrança 7az

A integração entre o **Native Infinity** e a **7AZ** Cobrança permite automatizar o envio de segunda via de boletos diretamente pela URA, proporcionando agilidade no atendimento e maior autonomia ao cliente. Essa funcionalidade reduz a necessidade de intervenção humana para demandas simples, otimizando o tempo da equipe e melhorando a experiência do usuário final.

Resultado: atendimentos mais rápidos, redução de filas no suporte e maior satisfação dos clientes ao resolverem suas pendências financeiras de forma prática e imediata.

## Resumo das soluções disponíveis para a integração de cobrança 7az

* Envio automático de segunda via de boleto via URA.

## Configurando o Native Infinity

Após configurar o Silber preencha o Token da API na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/7az/img1_7az.png)

---

## Integração - Native API

**URL:** https://wiki.native-infinity.com.br/integracoes/native_api/

# Default Native

A Integração **API Default** do **Native Infinity** foi desenvolvida para proporcionar máxima flexibilidade na comunicação com sistemas externos, permitindo a configuração de APIs personalizadas diretamente na plataforma.

Com ela, é possível configurar a URL de uma API, mapear variáveis específicas e definir eventos que disparam automaticamente requisições para outros sistemas. Essa integração permite acionar APIs em diferentes momentos da jornada da chamada, como quando o ramal toca, a ligação é atendida ou finalizada, facilitando a automação de processos e o intercâmbio de dados entre plataformas.

## Resumo das soluções disponíveis para a integração de API default na Native

* Integração com qualquer sistema via API
* Disparo automático de requisições com base em eventos de ligação (chamada recebida, atendida, encerrada, etc.)
* Mapeamento e envio de variáveis personalizadas na requisição
* Criação de fluxos automatizados e redução de tarefas manuais
* Flexibilidade para atender integrações com CRMs, ERPs, sistemas de atendimento e muito mais

## Configurando o Native Infinity

Para configura, basta acessar a Loja de Integrações e fornecer as informações desejadas.

![Untitled](../../img/integracoes/native/img1_native.png)

---

## Integração - Native Voicebot

**URL:** https://wiki.native-infinity.com.br/integracoes/native_voicebot/

# Default Native

A integração **Voicebot do Native Infinity** é uma solução baseada em Inteligência Artificial que potencializa os fluxos de atendimento nas URAs. Com ela, é possível criar experiências mais naturais e eficientes, onde o cliente interage por voz em vez de digitação, respondendo a perguntas previamente estruturadas. A IA interpreta essas respostas em tempo real e direciona o cliente para o destino mais adequado, como filas, ramais ou fluxos automatizados.

## Resumo das soluções disponíveis para a integração de Voicebot na Native

* Atendimento mais fluido e humanizado com reconhecimento de voz
* Redução de digitação por parte do cliente
* Redirecionamento inteligente com base nas respostas faladas

---

## Integração - MSVox

**URL:** https://wiki.native-infinity.com.br/integracoes/msvox/

# Automação MSVOX

A integração entre o **Native Infinity** e a **MSVOX** permite o uso do serviço de Análise de Chamadas com Detecção de Máquina de Resposta (Answer Machine Detection – AMD) disponibilizada pela propria MSVOX. Essa funcionalidade identifica automaticamente se uma chamada foi atendida por uma pessoa ou por uma caixa postal, secretária eletrônica ou atendente automática, otimizando o fluxo de atendimento e reduzindo desperdício de tempo e recursos.

## Resumo das soluções disponíveis para a integração com a MSVOX

* Detecção precisa de caixas postais e atendimentos automáticos

## Configurando o Native Infinity.

Para utilizar esta integração, é necessário possuir o token de acesso. Após obtê-lo, basta preenchê-lo no campo 'API Token' diretamente na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/msvox/img1_msvox.png)

---

## Integração - AWS

**URL:** https://wiki.native-infinity.com.br/integracoes/aws/

# Automação AWS

A integração entre o **Native Infinity** e o **AWS Polly** permite transformar textos em áudio de forma natural e automatizada diretamente na URA. Com essa funcionalidade, campos da lista do discador também podem ser transcritos para voz, possibilitando que informações específicas de cada contato sejam lidas automaticamente durante o atendimento na URA. Isso garante uma experiência mais personalizada e eficiente ao cliente.

## Resumo das soluções disponíveis para a integração com a AWS Polly

* Conversão de texto em voz com qualidade natural
* Personalização de mensagens com dados variáveis
* Integração direta com URAs do Native Infinity
* Otimização de campanhas no discador com mensagens dinâmicas

## Configurando o Native Infinity.

Para utilizar esta integração, é necessário contratar o serviço AWS Polly. Com isso, você terá acesso ao Access Key ID e à Secret Key, que deverão ser informados diretamente na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/aws/img_aws.png)

---

## Integração - Blip

**URL:** https://wiki.native-infinity.com.br/integracoes/blip/

# Automação Blip

A integração entre **Native Ifninity** e a **Blip** permite o envio automatizado de segunda via de boletos por meio da URA, oferecendo mais agilidade e autonomia ao cliente durante o atendimento telefônico. Com essa funcionalidade, o sistema identifica o solicitante e aciona o fluxo configurado na Blip para o envio do boleto por canal digital (como WhatsApp, por exemplo).

## Resumo das soluções disponíveis para a integração com a Blip

* Envio de segunda via de boleto via URA

## Configurando o Blip

Consulte o suporte do software para fazer a configuração do ambiente.

## Configurando o Native Infinity.

Para utilizar esta integração, é necessário preencher os campos Base URL e Token diretamente na Loja de Integrações do Native Infinity.

![Untitled](../../img/integracoes/blip/img1_blip.png)

---

