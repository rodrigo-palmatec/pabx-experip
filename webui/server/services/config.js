const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const ASTERISK_CONFIG_DIR = process.env.ASTERISK_CONFIG_DIR || '/etc/asterisk';

class ConfigManager {
  constructor() {
    this.configDir = ASTERISK_CONFIG_DIR;
  }

  readConfig(filename) {
    const filepath = path.join(this.configDir, filename);
    try {
      return fs.readFileSync(filepath, 'utf8');
    } catch (err) {
      logger.error(`Erro ao ler ${filename}: ${err.message}`);
      throw err;
    }
  }

  writeConfig(filename, content) {
    const filepath = path.join(this.configDir, filename);
    try {
      // Backup
      if (fs.existsSync(filepath)) {
        const backupPath = `${filepath}.bak.${Date.now()}`;
        fs.copyFileSync(filepath, backupPath);
      }
      fs.writeFileSync(filepath, content, 'utf8');
      logger.info(`Configuração ${filename} atualizada`);
      return true;
    } catch (err) {
      logger.error(`Erro ao escrever ${filename}: ${err.message}`);
      throw err;
    }
  }

  parseIniConfig(content) {
    const result = {};
    let currentSection = 'general';
    let sectionCounter = {};

    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      // Ignorar comentários e linhas vazias
      if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('#')) {
        continue;
      }

      // Nova seção
      const sectionMatch = trimmed.match(/^\[([^\]]+)\](.*)$/);
      if (sectionMatch) {
        const sectionName = sectionMatch[1];
        const inheritance = sectionMatch[2].replace(/[()!]/g, '').trim();

        // Se a seção já existe, criar uma versão única para não sobrescrever
        if (result[sectionName]) {
          // Incrementar contador para esta seção
          sectionCounter[sectionName] = (sectionCounter[sectionName] || 1) + 1;
          currentSection = `${sectionName}#${sectionCounter[sectionName]}`;
          result[currentSection] = {
            _originalName: sectionName,
            _inherit: inheritance || null
          };
        } else {
          currentSection = sectionName;
          result[currentSection] = { _inherit: inheritance || null };
        }
        continue;
      }

      // Chave = valor
      const keyValueMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (keyValueMatch) {
        const key = keyValueMatch[1].trim();
        const value = keyValueMatch[2].trim();

        if (!result[currentSection]) {
          result[currentSection] = {};
        }
        result[currentSection][key] = value;
      }
    }

    return result;
  }

  buildIniConfig(config) {
    let content = '; Gerado automaticamente pelo PABX Experip WebUI\n';
    content += `; ${new Date().toISOString()}\n\n`;

    for (const [section, values] of Object.entries(config)) {
      const inherit = values._inherit;
      if (inherit) {
        content += `[${section}](${inherit})\n`;
      } else {
        content += `[${section}]\n`;
      }

      for (const [key, value] of Object.entries(values)) {
        if (key !== '_inherit') {
          content += `${key} = ${value}\n`;
        }
      }
      content += '\n';
    }

    return content;
  }

  // PJSIP Extensions
  getExtensions() {
    try {
      const content = this.readConfig('pjsip.conf');
      logger.info(`Lendo pjsip.conf: ${content.length} bytes`);
      const config = this.parseIniConfig(content);
      logger.info(`Seções no pjsip.conf: ${Object.keys(config).length}`);

      const extensions = [];
      const processed = new Set();

      for (const [section, values] of Object.entries(config)) {
        // Detectar endpoints: tem type=endpoint OU herda de endpoint-template
        const isEndpoint = values.type === 'endpoint' || values._inherit === 'endpoint-template';

        if (isEndpoint && !section.includes('-') && !section.includes('template') && !processed.has(section)) {
          processed.add(section);

          // Extrair nome do callerid se existir
          let name = section;
          if (values.callerid) {
            const match = values.callerid.match(/"([^"]+)"/);
            if (match) {
              name = match[1];
            }
          }

          extensions.push({
            extension: section,
            name: name,
            callerid: values.callerid || section,
            context: values.context || 'internal',
            auth: values.auth,
            aors: values.aors,
            password: (values.auth && config[values.auth]) ? config[values.auth].password : ''
          });
        }
      }

      logger.info(`Ramais encontrados: ${extensions.length}`);
      return extensions;
    } catch (err) {
      logger.error('Erro ao buscar extensões:', err);
      return [];
    }
  }

  addExtension(ext) {
    const content = this.readConfig('pjsip.conf');

    const newConfig = `
; Ramal ${ext.extension}
[${ext.extension}](endpoint-template)
auth = ${ext.extension}-auth
aors = ${ext.extension}
callerid = "${ext.name}" <${ext.extension}>
context = ${ext.context || 'from-internal'}

[${ext.extension}-auth](auth-template)
username = ${ext.extension}
password = ${ext.password}

[${ext.extension}](aor-template)
`;

    const updatedContent = content + newConfig;
    this.writeConfig('pjsip.conf', updatedContent);

    return true;
  }

  deleteExtension(extension) {
    const content = this.readConfig('pjsip.conf');
    const lines = content.split('\n');
    const newLines = [];
    let skip = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Detectar início de seção do ramal
      if (trimmed.startsWith(`[${extension}]`) ||
        trimmed.startsWith(`[${extension}-auth]`)) {
        skip = true;
        continue;
      }

      // Nova seção - parar de pular
      if (trimmed.startsWith('[') && !trimmed.startsWith(`[${extension}`)) {
        skip = false;
      }

      if (!skip) {
        newLines.push(line);
      }
    }

    this.writeConfig('pjsip.conf', newLines.join('\n'));
    return true;
  }

  // Troncos PJSIP
  getTrunks() {
    try {
      const content = this.readConfig('pjsip.conf');
      const config = this.parseIniConfig(content);

      logger.info(`Total de seções no pjsip.conf: ${Object.keys(config).length}`);

      const trunks = [];
      const trunkEndpoints = new Map();

      // Primeira passagem: identificar todas as seções de tronco endpoint
      for (const [section, values] of Object.entries(config)) {
        const originalName = values._originalName || section;

        // Verificar se é um tronco (começa com trunk-)
        if (originalName.startsWith('trunk-') && values.type === 'endpoint') {
          // Usar o nome original sem sufixo
          if (!trunkEndpoints.has(originalName)) {
            trunkEndpoints.set(originalName, values);
            logger.info(`Tronco encontrado: ${originalName}, type: ${values.type}`);
          }
        }
      }

      logger.info(`Total de troncos encontrados: ${trunkEndpoints.size}`);

      // Segunda passagem: coletar dados dos troncos
      for (const [trunkName, endpoint] of trunkEndpoints) {
        trunks.push({
          name: trunkName,
          host: endpoint.outbound_proxy || endpoint.from_domain || '',
          context: endpoint.context || 'from-trunk',
          ...endpoint,
          username: (endpoint.auth && config[endpoint.auth]) ? config[endpoint.auth].username : '',
          password: (endpoint.auth && config[endpoint.auth]) ? config[endpoint.auth].password : ''
        });

        if (endpoint.auth) {
          logger.info(`[Debug] Tronco: ${trunkName}, Auth: ${endpoint.auth}`);
          if (config[endpoint.auth]) {
            logger.info(`[Debug] Auth section found. Username: ${config[endpoint.auth].username}, Password: ${config[endpoint.auth].password ? '***' : 'empty'}`);
          } else {
            logger.warn(`[Debug] Auth section '${endpoint.auth}' NOT FOUND. Keys available: ${Object.keys(config).filter(k => k.includes('auth')).join(', ')}`);
          }
        }
      }

      return trunks;
    } catch (err) {
      logger.error(`Erro ao buscar troncos: ${err.message}`);
      return [];
    }
  }
}

module.exports = new ConfigManager();
