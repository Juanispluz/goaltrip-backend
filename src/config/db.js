const { Pool } = require('pg');
require('dotenv').config();

// Configuración usando parámetros individuales desde .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Base de datos GoalTrip Conectada');
});

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err.message);
  console.error('Verifica las variables del .env');
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};