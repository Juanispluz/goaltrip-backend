const verificarApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ 
      error: true, 
      mensaje: 'API Key requerida',
      codigo: 401 
    });
  }

  if (apiKey !== process.env.API_KEY_SECRET) {
    return res.status(403).json({ 
      error: true, 
      mensaje: 'API Key inválida',
      codigo: 403 
    });
  }

  next();
};

module.exports = { verificarApiKey };