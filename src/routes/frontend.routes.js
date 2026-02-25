const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// GET / - Sirve el HTML con variables inyectadas
router.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, '../../index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Inyectar variables desde .env
  html = html.replace('__API_URL__', process.env.APP_URL || 'http://localhost:3000/api');
  html = html.replace('__API_KEY__', process.env.API_KEY_SECRET);

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

module.exports = router;