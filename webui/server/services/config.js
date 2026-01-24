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
        currentSection = sectionMatch[1];
        const inheritance = sectionMatch[2].replace(/[()!]/g, '').trim();
        if (!result[currentSection]) {
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
      const config = this.parseIniConfig(content);
      
      const extensions = [];
      const processed = new Set();
      
      for (const [section, values] of Object.entries(config)) {
        if (values.type === 'endpoint' && !section.includes('-') && !processed.has(section)) {
          processed.add(section);
          extensions.push({
            extension: section,
            callerid: values.callerid || section,
            context: values.context || 'internal',
            auth: values.auth,
            aors: values.aors
          });
        }
      }
      
      return extensions;
    } catch (err) {
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
      
      const trunks = [];
      
      for (const [section, values] of Object.entries(config)) {
        if (section.startsWith('trunk-') && values.type === 'endpoint') {
          trunks.push({
            name: section,
            host: values.outbound_proxy || '',
            context: values.context || 'from-trunk',
            ...values
          });
        }
      }
      
      return trunks;
    } catch (err) {
      return [];
    }
  }
}

module.exports = new ConfigManager();
