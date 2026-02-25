// src/services/paquetes.service.js

/*
Funciones de lógica de negocio para paquetes
Aquí luego se conectará el repository con PostgreSQL
*/

const getAllPaquetes = async () => {
  // Luego:
  // return await paquetesRepository.findAll();

  return [];
};

const getPaqueteById = async (id) => {
  if (!id) {
    throw new Error("El id del paquete es obligatorio");
  }

  // Luego:
  // const paquete = await paquetesRepository.findById(id);

  return { id };
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

  // Luego:
  // return await paquetesRepository.update(id, data);

  return {
    id,
    ...data,
  };
};

module.exports = {
  getAllPaquetes,
  getPaqueteById,
  updatePaquete,
};