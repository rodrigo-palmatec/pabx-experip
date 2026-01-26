#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../data', 'pabx.db');

async function addTrunkIdColumn() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco:', err);
        reject(err);
        return;
      }
      
      console.log('Conectado ao banco SQLite');
      
      // Adicionar coluna trunkId
      const sql = `
        ALTER TABLE inbound_routes 
        ADD COLUMN trunkId TEXT(100) 
        DEFAULT NULL 
      `;
      
      db.run(sql, function(err) {
        if (err) {
          // Se a coluna já existe, ignorar erro
          if (err.message.includes('duplicate column name')) {
            console.log('Coluna trunkId já existe');
            resolve();
          } else {
            console.error('Erro ao adicionar coluna:', err);
            reject(err);
          }
        } else {
          console.log('Coluna trunkId adicionada com sucesso');
          resolve();
        }
      });
    });
  });
}

// Executar
addTrunkIdColumn()
  .then(() => {
    console.log('Migração concluída com sucesso!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erro na migração:', err);
    process.exit(1);
  });
