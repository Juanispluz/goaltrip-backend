const { Pool } = require('pg');
require('dotenv').config();

// Configuración usando URL de conexión o parámetros individuales
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Validación de conexión
pool.on('connect', () => console.log('Base de datos GoalTrip Conectada'));

module.exports = {
  query: (text, params) => pool.query(text, params),
};