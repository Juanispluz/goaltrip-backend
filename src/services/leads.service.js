// src/services/leads.service.js

const createLead = async (data) => {
  const { nombre, email, telefono, mensaje, paquete_id } = data;

  if (!nombre || !email || !telefono || !paquete_id) {
    throw new Error("Faltan campos obligatorios");
  }

  if (!email.includes("@")) {
    throw new Error("Email inválido");
  }
  // Luego insertar en DB
  return {
    id: 1,
    ...data,
  };
};

module.exports = {
  createLead,
};