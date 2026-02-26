# GoalTrip Backend API
API REST para gestionar paquetes turísticos y registrar leads de usuarios interesados.

El sistema permite:
- Consultar paquetes turísticos por ciudad sede
- Ver detalle de paquetes asociados a partidos
- Registrar leads de usuarios interesados en viajar al mundial

Este proyecto está diseñado para integrarse con un frontend web.

#Tecnologias
- Node.js
- Express
- PostgreSQL
- Docker

## Arquitectura
El proyecto implementa arquitectura en capas:

Routes → Controllers → Services → Models → Database

Descripción de capas:
- Routes: define los endpoints REST
- Controllers: recibe request y envía response
- Services: contiene la lógica de negocio
- Models: estructura de datos
- Database: PostgreSQL

## Seguridad
La API utiliza:
- API Key para proteger endpoints
- Rate Limit para evitar ataques automatizados

## Base de datos
El script de creación de tablas está en:
db/init.sql

Tablas principales:
- paquetes
- leads


## Estructura del proyecto

src/
 ├── config        # Configuración de base de datos
 ├── controllers   # Manejo de request/response
 ├── middlewares   # Seguridad (API Key + Rate Limit)
 ├── models        # Estructura de datos
 ├── routes        # Endpoints
 ├── services      # Lógica de negocio
 └── app.js        # Archivo principal

db/
 └── init.sql      # Script de base de datos


 ## Endpoints

### Obtener todos los paquetes
GET /api/paquetes
Response 200:
[
 {
   "id": 1,
   "ciudad": "Miami",
   "pais": "Estados Unidos",
   "precio_cop": 1200000,
   "cupos": 20,
   "fecha_salida": "2026-06-10"
 }
]

### Obtener paquete por id
GET /api/paquetes/:id

Response 200:
{
  "id": 1,
  "ciudad": "Miami",
  "pais": "Estados Unidos"
}

Response 404:
Paquete no encontrado

### Actualizar paquete

PATCH /api/paquetes/:id
Body:
{
 "cupos": 10,
 "activo": true
}

### Crear Lead
POST /api/leads
Body:
{
 "nombre": "Juan Perez",
 "email": "juan@gmail.com",
 "telefono": "3000000000",
 "mensaje": "Quiero información",
 "paquete_id": 1
}
Response 201:
Lead creado correctamente

## Run

Levantar base de datos con Docker:

docker compose up -d

Ejecutar servidor:

npm run dev

http://localhost:3000
