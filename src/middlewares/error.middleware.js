const manejoErrores = (err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor',
    codigo: err.status || 500
  });
};

module.exports = manejoErrores;