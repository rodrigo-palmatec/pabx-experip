const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const logger = require('../utils/logger');

class DialplanGenerator {
  constructor() {
    this.configPath = '/etc/asterisk';
    this.extensionsFile = 'extensions_additional.conf';
  }

  async generateDialplan() {
    try {
      const { InboundRoute } = require('../models');
      
      // Buscar todas as rotas ativas ordenadas por prioridade
      const routes = await InboundRoute.findAll({
        where: { enabled: true },
        order: [['priority', 'DESC'], ['name', 'ASC']],
        include: [{
          model: require('../models').ServiceHour,
          as: 'ServiceHour',
          required: false
        }]
      });

      let dialplan = this.generateHeader();
      
      // Gerar contexto para rotas de entrada
      dialplan += this.generateInboundContext(routes);
      
      // Escrever arquivo
      const filePath = path.join(this.configPath, this.extensionsFile);
      await fs.writeFile(filePath, dialplan, 'utf8');
      
      logger.info(`Dialplan gerado: ${filePath}`);
      
      // Recarregar dialplan no Asterisk
      await this.reloadDialplan();
      
      return { success: true, message: 'Dialplan gerado e recarregado com sucesso' };
    } catch (error) {
      logger.error('Erro ao gerar dialplan:', error);
      throw error;
    }
  }

  generateHeader() {
    return `;
; Arquivo gerado automaticamente pelo PABX Experip
; Data: ${new Date().toISOString()}
; Não edite manualmente - as alterações serão perdidas

[from-trunk-custom]
; Contexto principal para rotas de entrada

`;
  }

  generateInboundContext(routes) {
    let context = '';
    
    routes.forEach((route, index) => {
      const exten = this.generateExtensionPattern(route);
      const priority = (index + 1) * 10; // Prioridades 10, 20, 30...
      
      context += `; Rota: ${route.name} (ID: ${route.id})
exten => ${exten},${priority},NoOp(Processando rota: ${route.name})
`;
      
      // Verificação de tronco específico
      if (route.trunkId) {
        context += `same => n,ExecIf($["${CHANNEL(peername)}" != "${route.trunkId}"]?Return())
`;
      }
      
      // Verificação de horário
      if (route.serviceHourId && route.ServiceHour) {
        const timeCondition = this.generateTimeCondition(route.ServiceHour);
        context += `same => n,GotoIfTime(${timeCondition}?destino_${route.id}:fora_horario_${route.id})
`;
      }
      
      // Destino principal
      const destination = this.generateDestination(route);
      context += `same => n(destino_${route.id}),${destination}
`;
      
      // Destino fora de horário (se configurado)
      if (route.serviceHourId && route.outOfServiceDestType && route.outOfServiceDestType !== 'hangup') {
        const outOfServiceDestination = this.generateDestination({
          destinationType: route.outOfServiceDestType,
          destinationId: route.outOfServiceDestId,
          destinationData: route.outOfServiceDestData
        });
        context += `same => n(fora_horario_${route.id}),${outOfServiceDestination}
`;
      } else if (route.serviceHourId) {
        context += `same => n(fora_horario_${route.id}),Hangup()
`;
      }
      
      context += '\n';
    });
    
    // Adicionar extensão catch-all no final
    context += `; Rota padrão (catch-all)
exten => s,1,NoOp(Sem rota correspondente - desligando)
same => n,Hangup()

exten => _X.,1,NoOp(Sem rota correspondente - desligando)
same => n,Hangup()

`;
    
    return context;
  }

  generateExtensionPattern(route) {
    if (!route.did || route.did === '') {
      return 's';  // Catch-all
    }
    
    // Converter DID para padrão Asterisk se necessário
    let did = route.did;
    
    // Se não começar com _, adicionar para correspondência exata
    if (!did.startsWith('_') && !did.startsWith('s')) {
      // Limpar caracteres não numéricos para correspondência exata
      did = did.replace(/[^0-9*#+]/g, '');
    }
    
    return did;
  }

  generateTimeCondition(serviceHour) {
    // Formato: horas,dias,meses,dias_do_mes
    // Exemplo: 08:00-18:00,mon-fri,*,*
    
    if (!serviceHour) {
      return '*';  // Sempre
    }
    
    let timeCondition = '';
    
    // Horário
    if (serviceHour.openTime && serviceHour.closeTime) {
      timeCondition += `${serviceHour.openTime}-${serviceHour.closeTime}`;
    } else {
      timeCondition += '*';
    }
    
    // Dias da semana
    if (serviceHour.weekdays) {
      timeCondition += `,${serviceHour.weekdays}`;
    } else {
      timeCondition += ',*';
    }
    
    // Dias do mês
    timeCondition += ',*';
    
    // Meses
    timeCondition += ',*';
    
    return timeCondition;
  }

  generateDestination(route) {
    switch (route.destinationType) {
      case 'peer':
        return `Goto(from-internal,${route.destinationData || route.destinationId},1)`;
      
      case 'queue':
        return `Goto(from-queue,${route.destinationId},1)`;
      
      case 'ivr':
        return `Goto(from-ivr,${route.destinationId},1)`;
      
      case 'external':
        // Formato: Dial(SIP/operadora/${numero})
        return `Dial(SIP/trunk-operadora/${route.destinationData})`;
      
      case 'voicemail':
        return `Voicemail(${route.destinationData || route.destinationId},u)`;
      
      case 'hangup':
        return 'Hangup()';
      
      default:
        return 'Hangup()';
    }
  }

  async reloadDialplan() {
    try {
      const { stdout, stderr } = await execAsync('asterisk -rx "dialplan reload"');
      
      if (stderr) {
        logger.warn('Aviso ao recarregar dialplan:', stderr);
      }
      
      logger.info('Dialplan recarregado com sucesso');
      return stdout;
    } catch (error) {
      logger.error('Erro ao recarregar dialplan:', error);
      throw error;
    }
  }

  async validateDialplan() {
    try {
      const { stdout, stderr } = await execAsync('asterisk -rx "dialplan show from-trunk-custom"');
      
      if (stderr && !stderr.includes('No such context')) {
        throw new Error(`Erro no dialplan: ${stderr}`);
      }
      
      return { valid: true, output: stdout };
    } catch (error) {
      logger.error('Erro ao validar dialplan:', error);
      return { valid: false, error: error.message };
    }
  }
}

module.exports = DialplanGenerator;
