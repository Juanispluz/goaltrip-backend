const manejoErrores = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor',
    codigo: status,
    ...(err.details ? { details: err.details } : {}),
  });
};

module.exports = manejoErrores;