// src/services/leads.service.js

const LeadsRepository = require('../repositories/leads.repository');
const AppError = require('../utils/AppError');
const { isValidEmail } = require('../utils/validators');

const createLead = async (data) => {
  const { nombre, email, telefono, mensaje, paquete_id } = data;

  if (!nombre || !email || !telefono || !paquete_id) {
    throw new AppError('Faltan campos obligatorios', 400);
  }

  if (!isValidEmail(email)) {
    throw new AppError('Email inválido', 400);
  }

  try {
    return await LeadsRepository.insert({ nombre, email, telefono, mensaje, paquete_id });
  } catch (err) {
    // FK: paquete_id no existe
    if (err.code === '23503') {
      throw new AppError('paquete_id no existe', 400);
    }
    throw err;
  }
};

const getAllLeads = async () => {
  return LeadsRepository.findAll();
};

module.exports = { createLead, getAllLeads };