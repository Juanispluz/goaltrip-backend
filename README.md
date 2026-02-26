# GoalTrip Backend

API REST para gestión de paquetes turísticos y leads.

## Arquitectura

El proyecto utiliza una **arquitectura por capas (Layered Architecture)** que organiza el código en:

- **Routes**: Definición de endpoints y validación básica
- **Controllers**: Lógica de negocio relacionada con HTTP (request/response)
- **Services**: Lógica de negocio reutilizable
- **Repositories**: Acceso y operaciones con la base de datos
- **Models**: Modelos de datos (entidades)
- **Utils**: Utilidades y helpers
- **Middlewares**: Funciones intermedias (auth, rate limit, errores)

Esta arquitectura fue elegida porque:
- Separa responsabilidades de forma clara
- Facilita el mantenimiento y testing
- Es simple pero escalable para un proyecto de este tamaño
- Permite reutilizar lógica de negocio en diferentes controladores

## Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de datos**: PostgreSQL
- **Contenedores**: Docker + Docker Compose

## Estructura del Proyecto

```
src/
├── app.js                 # Configuración principal de Express
├── config/
│   └── db.js             # Conexión a PostgreSQL
├── controllers/          # Controladores (lógica HTTP)
│   ├── paquetes.controller.js
│   └── leads.controller.js
├── middlewares:          # Middlewares personalizados
│   ├── auth.middleware.js      # Autenticación por API Key
│   ├── rateLimit.middleware.js # Rate limiting
│   └── error.middleware.js    # Manejo de errores
├── models/              # Modelos de datos
│   ├── Paquete.js
│   └── Lead.js
├── repositories/        # Acceso a datos (DB)
│   ├── paquete.repository.js
│   └── lead.repository.js
├── routes/              # Definición de rutas
│   ├── paquetes.routes.js
│   ├── leads.routes.js
│   └── frontend.routes.js
├── services/            # Servicios (lógica de negocio)
│   ├── paquetes.service.js
│   └── leads.service.js
└── utils/               # Utilidades
    └── responses.js     # Respuestas estandarizadas

compose.yml              # Docker Compose
Dockerfile               # Imagen del contenedor
db/init.sql             # Script de inicialización de BD
```

## API Key

La API utiliza autenticación mediante **API Key**. Las claves se generan usando el método de **llave privada** configurado en el servidor.

### Uso

Incluir el header `x-api-key` en las peticiones:

```bash
curl -H "x-api-key: tu_api_key" http://localhost:3000/api/paquetes
```

## Códigos de Estado HTTP

La API utiliza códigos de estado HTTP estándar para responder a las peticiones:

| Código | Nombre | Descripción |
|--------|--------|-------------|
| **200** | OK | Respuesta exitosa general |
| **201** | Created | Recurso creado exitosamente |
| **400** | Bad Request | Error de validación (datos inválidos o faltantes) |
| **401** | Unauthorized | API Key no proporcionada |
| **403** | Forbidden | API Key inválida |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Server Error | Error interno del servidor |

### Estructura de respuestas de error

```json
{
  "error": true,
  "mensaje": "Descripción del error",
  "codigo": 400
}
```

### Manejo de errores

El proyecto cuenta con middlewares especializados:

- **`error.middleware.js`**: Manejo centralizado de errores - captura excepciones y devuelve el código apropiado
- **`auth.middleware.js`**: Autenticación por API Key - devuelve 401 si falta, 403 si es inválida
- **`responses.js`**: Utilidades para respuestas estandarizadas (`successResponse`, `errorResponse`, `validationErrorResponse`, etc.)

## Endpoints

### Paquetes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/paquetes` | Listar todos los paquetes |
| GET | `/api/paquetes/:id` | Obtener paquete por ID |
| POST | `/api/paquetes` | Crear nuevo paquete |
| PUT | `/api/paquetes/:id` | Actualizar paquete |
| DELETE | `/api/paquetes/:id` | Eliminar paquete |

### Leads

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/leads` | Listar todos los leads |
| POST | `/api/leads` | Crear nuevo lead |

### Sistema

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `DB_USER` | Usuario de PostgreSQL | goaltrip |
| `DB_PASSWORD` | Contraseña de PostgreSQL | goaltrip123 |
| `DB_NAME` | Nombre de la base de datos | goaltrip |
| `DB_PORT` | Puerto de PostgreSQL | 5432 |
| `APP_PORT` | Puerto de la aplicación | 3000 |
| `API_KEY_SECRET` | Clave secreta para generar API keys |
| `RATE_LIMIT_WINDOW_MS` | Ventana de tiempo para rate limit (ms) | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de peticiones en la ventana | 100 |
| `FRONTEND_URL` | URL del frontend para CORS | * |

## Instalación y Ejecución

### Con Docker (Recomendado)

```bash
# Iniciar los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Detener servicios
docker compose down
```

### Localmente (Sin Docker)

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar servidor
node src/app.js
```

La API estará disponible en `http://localhost:3000`

## Frontend

El proyecto incluye un frontend básico en HTML que se sirve en la ruta raíz (`/`). Accede a `http://localhost:3000` para verlo.

## Licencia

MIT
