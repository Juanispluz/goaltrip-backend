const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { 
    error: true, 
    mensaje: 'Demasiadas peticiones, intente más tarde',
    codigo: 429 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;