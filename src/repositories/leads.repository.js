const db = require('../config/db');

const insert = async ({ nombre, email, telefono, mensaje, paquete_id }) => {
  const { rows } = await db.query(
    `INSERT INTO leads (nombre, email, telefono, mensaje, paquete_id, estado)
     VALUES ($1, $2, $3, $4, $5, 'nuevo')
     RETURNING *`,
    [nombre, email, telefono, mensaje ?? null, paquete_id]
  );

  return rows[0];
};

const findAll = async () => {
  const { rows } = await db.query('SELECT * FROM leads ORDER BY fecha DESC');
  return rows;
};

module.exports = { insert, findAll };