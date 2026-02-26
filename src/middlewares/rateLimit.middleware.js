require('dotenv').config();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: { 
    error: true, 
    mensaje: 'Demasiadas peticiones, intente más tarde',
    codigo: 429 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;