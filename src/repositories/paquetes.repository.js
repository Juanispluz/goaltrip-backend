const db = require('../config/db');

const findAllActivos = async () => {
  const { rows } = await db.query(
    'SELECT * FROM paquetes WHERE activo = true ORDER BY fecha_salida ASC'
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM paquetes WHERE id = $1', [id]);
  return rows[0] || null;
};

const updateById = async (
  id,
  { cupos = null, activo = null, precio_cop = null, descripcion = null }
) => {
  const { rows } = await db.query(
    `UPDATE paquetes SET 
       cupos = COALESCE($1, cupos),
       activo = COALESCE($2, activo),
       precio_cop = COALESCE($3, precio_cop),
       descripcion = COALESCE($4, descripcion),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [cupos, activo, precio_cop, descripcion, id]
  );

  return rows[0] || null;
};

module.exports = { findAllActivos, findById, updateById };