// src/services/leads.service.js

const db = require('../config/db');

const createLead = async (data) => {
  const { nombre, email, telefono, mensaje, paquete_id } = data;

  if (!nombre || !email || !telefono || !paquete_id) {
    throw new Error("Faltan campos obligatorios");
  }

  if (!email.includes("@")) {
    throw new Error("Email inválido");
  }

  const result = await db.query(
    `INSERT INTO leads (nombre, email, telefono, mensaje, paquete_id, estado) 
     VALUES ($1, $2, $3, $4, $5, 'nuevo') RETURNING *`,
    [nombre, email, telefono, mensaje, paquete_id]
  );

  return result.rows[0];
};

const getAllLeads = async () => {
  const result = await db.query('SELECT * FROM leads ORDER BY fecha DESC');
  return result.rows;
};

module.exports = {
  createLead,
  getAllLeads,
};