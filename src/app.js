const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization']
}));
app.use(express.json());

// Rate Limit
const rateLimiter = require('./middlewares/rateLimit.middleware');
app.use(rateLimiter);

// API Key Middleware (EXCEPTO para ruta frontend)
const { verificarApiKey } = require('./middlewares/auth.middleware');
app.use((req, res, next) => {
    if (req.path === '/') return next(); // Skip auth para el HTML
    verificarApiKey(req, res, next);
});

// Rutas API
const paquetesRoutes = require('./routes/paquetes.routes');
const leadsRoutes = require('./routes/leads.routes');
const frontendRoutes = require('./routes/frontend.routes');

app.use('/api/paquetes', paquetesRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/', frontendRoutes); // Ruta para el HTML

// Error Handler
const manejoErrores = require('./middlewares/error.middleware');
app.use(manejoErrores);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Servidor
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`GoalTrip API corriendo en http://localhost:${PORT}`);
});