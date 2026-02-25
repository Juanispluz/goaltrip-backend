const express = require("express");
const router = express.Router();

const paquetesController = require("../controllers/paquetes.controller");

// GET /api/paquetes
router.get("/", paquetesController.getAll);

// GET /api/paquetes/:id
router.get("/:id", paquetesController.getById);

// PATCH /api/paquetes/:id
router.patch("/:id", paquetesController.update);

module.exports = router;