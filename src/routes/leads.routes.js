const express = require("express");
const router = express.Router();

const leadsController = require("../controllers/leads.controller");

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Crear un lead
 *     responses:
 *       201:
 *         description: Lead creado correctamente
 */
router.post("/", leadsController.create);

module.exports = router;