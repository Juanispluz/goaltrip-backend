const express = require("express");
const router = express.Router();

const paquetesController = require("../controllers/paquetes.controller");

/**
 * @swagger
 * /api/paquetes:
 *   get:
 *     summary: Obtener todos los paquetes turísticos
 *     responses:
 *       200:
 *         description: Lista de paquetes
 */
router.get("/", paquetesController.getAll);

/**
 * @swagger
 * /api/paquetes/{id}:
 *   get:
 *     summary: Obtener paquete por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paquete encontrado
 *       404:
 *         description: No encontrado
 */
router.get("/:id", paquetesController.getById);

/**
 * @swagger
 * /api/paquetes/{id}:
 *   patch:
 *     summary: Actualizar cupos o estado del paquete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paquete actualizado
 */
router.patch("/:id", paquetesController.update);

module.exports = router;