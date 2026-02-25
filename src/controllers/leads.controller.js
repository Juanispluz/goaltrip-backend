const LeadService = require('../services/leads.service');

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const lead = await LeadService.createLead(data);
    
    res.status(201).json({
      error: false,
      mensaje: 'Lead registrado exitosamente',
      data: lead
    });
  } catch (error) {
    if (error.message.includes('Faltan campos') || error.message.includes('Email')) {
      return res.status(400).json({ 
        error: true, 
        mensaje: error.message,
        codigo: 400 
      });
    }
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const leads = await LeadService.getAllLeads();
    res.status(200).json(leads);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll };