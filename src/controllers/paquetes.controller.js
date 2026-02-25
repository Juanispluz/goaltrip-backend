const PaqueteService = require('../services/paquetes.service');

const getAll = async (req, res, next) => {
  try {
    const paquetes = await PaqueteService.getAllPaquetes();
    res.status(200).json(paquetes);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paquete = await PaqueteService.getPaqueteById(id);
    
    if (!paquete) {
      return res.status(404).json({ 
        error: true, 
        mensaje: 'Paquete no encontrado',
        codigo: 404 
      });
    }
    
    res.status(200).json(paquete);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const paquete = await PaqueteService.updatePaquete(id, data);
    
    res.status(200).json(paquete);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, update };