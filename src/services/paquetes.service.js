// src/services/paquetes.service.js

/*
Funciones de lógica de negocio para paquetes
Aquí luego se conectará el repository con PostgreSQL
*/

const db = require('../config/db');

const getAllPaquetes = async () => {
  const result = await db.query('SELECT * FROM paquetes WHERE activo = true ORDER BY fecha_salida ASC');
  return result.rows;
};

const getPaqueteById = async (id) => {
  if (!id) {
    throw new Error("El id del paquete es obligatorio");
  }

  const result = await db.query('SELECT * FROM paquetes WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const updatePaquete = async (id, data) => {
  if (!id) {
    throw new Error("El id es obligatorio");
  }

  const { cupos, activo, precio_cop, descripcion } = data;

  if (
    cupos === undefined &&
    activo === undefined &&
    precio_cop === undefined &&
    descripcion === undefined
  ) {
    throw new Error("Debe enviar al menos un campo para actualizar");
  }

  const result = await db.query(
    `UPDATE paquetes SET 
       cupos = COALESCE($1, cupos),
       activo = COALESCE($2, activo),
       precio_cop = COALESCE($3, precio_cop),
       descripcion = COALESCE($4, descripcion),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 RETURNING *`,
    [cupos, activo, precio_cop, descripcion, id]
  );

  return result.rows[0];
};

module.exports = {
  getAllPaquetes,
  getPaqueteById,
  updatePaquete,
};