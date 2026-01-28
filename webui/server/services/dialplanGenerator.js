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
      const { InboundRoute, OutboundRoute, Trunk } = require('../models');

      // Buscar rodas de entrada
      const inboundRoutes = await InboundRoute.findAll({
        where: { enabled: true },
        order: [['priority', 'DESC'], ['name', 'ASC']],
        include: [{
          model: require('../models').ServiceHour,
          as: 'ServiceHour',
          required: false
        }]
      });

      // Buscar rotas de saída
      const outboundRoutes = await OutboundRoute.findAll({
        where: { enabled: true },
        include: [{
          model: Trunk,
          as: 'Trunk'
        }],
        order: [['priority', 'DESC'], ['name', 'ASC']]
      });

      let dialplan = this.generateHeader();

      // Gerar contexto para rotas de entrada
      dialplan += this.generateInboundContext(inboundRoutes);

      // Gerar contexto para rotas de saída
      dialplan += this.generateOutboundContext(outboundRoutes);

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

[from-trunk]
include => from-trunk-custom

`;
  }

  generateInboundContext(routes) {
    let context = '';

    routes.forEach((route, index) => {
      const exten = this.generateExtensionPattern(route);

      context += `; Rota de Entrada: ${route.name} (ID: ${route.id})
exten => ${exten},1,NoOp(Processando rota entrada: ${route.name})
`;

      if (route.trunkId) {
        context += `same => n,ExecIf($["\${CHANNEL(peername)}" != "${route.trunkId}"]?Return())
`;
      }

      if (route.serviceHourId && route.ServiceHour) {
        const timeCondition = this.generateTimeCondition(route.ServiceHour);
        context += `same => n,GotoIfTime(${timeCondition}?destino_${route.id}:fora_horario_${route.id})
`;
      } else {
        context += `same => n,Goto(destino_${route.id})
`;
      }

      // Destino
      const destination = this.generateDestination(route);
      context += `same => n(destino_${route.id}),${destination}
`;

      // Fora de horário
      if (route.serviceHourId) {
        if (route.outOfServiceDestType && route.outOfServiceDestType !== 'hangup') {
          const outOfServiceDestination = this.generateDestination({
            destinationType: route.outOfServiceDestType,
            destinationId: route.outOfServiceDestId,
            destinationData: route.outOfServiceDestData
          });
          context += `same => n(fora_horario_${route.id}),${outOfServiceDestination}
`;
        } else {
          context += `same => n(fora_horario_${route.id}),Hangup()
`;
        }
      }

      context += '\n';
    });

    return context;
  }

  generateOutboundContext(routes) {
    let context = `
[outbound-all-routes]
; Contexto incluso no from-internal para permitir saídas
`;

    routes.forEach(route => {
      let pattern = route.pattern;

      context += `; Rota de Saída: ${route.name}
exten => ${pattern},1,NoOp(Processando rota saida: ${route.name})
`;

      let dialStr = '\\${EXTEN}';

      if (route.prefix && route.prefix.length > 0) {
        dialStr = `\\${EXTEN:${ route.prefix.length }
      } `;
      }

      if (route.prepend && route.prepend.length > 0) {
        dialStr = `${ route.prepend }${ dialStr } `;
      }

      if (route.Trunk) {
        const tech = 'PJSIP';
        const trunkName = route.Trunk.name;
        const host = route.Trunk.host || route.Trunk.domain;

        context += `same => n, Dial(${ tech } / ${ trunkName } / sip: ${ dialStr }@${ host }, 60, T)
      same => n, Hangup()
        `;
      } else {
        context += `same => n, NoOp(Erro: Rota sem tronco valido)
      same => n, Hangup()
        `;
      }
      context += '\n';
    });

    return context;
  }

  generateExtensionPattern(route) {
    if (!route.did || route.did === '') {
      return 's';  // Catch-all
    }
    return route.did;
  }

  generateTimeCondition(serviceHour) {
    if (!serviceHour) {
      return '*|*|*|*';
    }

    let time = '*';
    if (serviceHour.openTime && serviceHour.closeTime) {
      time = `${ serviceHour.openTime } -${ serviceHour.closeTime } `;
    }

    let dow = '*';
    if (serviceHour.weekdays) {
      dow = serviceHour.weekdays;
    }

    return `${ time }| ${ dow }|*|* `;
  }

  generateDestination(route) {
    if (!route.destinationType) return 'Hangup()';

    switch (route.destinationType) {
      case 'peer':
        return `Goto(from - internal, ${ route.destinationData || route.destinationId }, 1)`;
      case 'queue':
        return `Queue(${ route.destinationData || route.destinationId })`;
      case 'ivr':
        return `Goto(ivr - ${ route.destinationId }, s, 1)`;
      case 'external':
        return `Goto(outbound - all - routes, ${ route.destinationData }, 1)`;
      case 'voicemail':
         return `Voicemail(${ route.destinationData || route.destinationId }, u)`;
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
        throw new Error(`Erro no dialplan: ${ stderr } `);
      }
      return { valid: true, output: stdout };
    } catch (error) {
      logger.error('Erro ao validar dialplan:', error);
      return { valid: false, error: error.message };
    }
  }
}

module.exports = DialplanGenerator;
