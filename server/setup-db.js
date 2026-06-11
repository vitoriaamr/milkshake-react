import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  const sql = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

  console.log('Criando banco de dados e tabelas...');
  await connection.query(sql);
  console.log('Banco de dados "shake_haven" pronto, com lojas de exemplo em São Paulo.');

  await connection.end();
}

setup().catch((err) => {
  console.error('Erro ao configurar o banco de dados:', err);
  process.exit(1);
});
