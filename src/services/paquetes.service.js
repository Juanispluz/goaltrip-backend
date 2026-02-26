// src/services/paquetes.service.js

/*
Funciones de lógica de negocio para paquetes
Aquí luego se conectará el repository con PostgreSQL
*/

const PaquetesRepository = require('../repositories/paquetes.repository');
const AppError = require('../utils/AppError');

const getAllPaquetes = async () => {
  return PaquetesRepository.findAllActivos();
};

const getPaqueteById = async (id) => {
  if (!id) throw new AppError('El id del paquete es obligatorio', 400);
  return PaquetesRepository.findById(id);
};

const updatePaquete = async (id, data) => {
  if (!id) throw new AppError('El id es obligatorio', 400);

  const { cupos, activo, precio_cop, descripcion } = data || {};

  const hasAny =
    cupos !== undefined ||
    activo !== undefined ||
    precio_cop !== undefined ||
    descripcion !== undefined;

  if (!hasAny) {
    throw new AppError('Debe enviar al menos un campo para actualizar', 400);
  }

  // Validaciones rápidas (opcionales pero recomendadas)
  if (cupos !== undefined && (!Number.isInteger(cupos) || cupos < 0)) {
    throw new AppError('cupos debe ser un entero >= 0', 400);
  }

  const updated = await PaquetesRepository.updateById(id, {
    cupos: cupos ?? null,
    activo: activo ?? null,
    precio_cop: precio_cop ?? null,
    descripcion: descripcion ?? null,
  });

  if (!updated) throw new AppError('Paquete no encontrado', 404);

  return updated;
};

module.exports = { getAllPaquetes, getPaqueteById, updatePaquete };