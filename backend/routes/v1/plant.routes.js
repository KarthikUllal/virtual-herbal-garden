const express = require("express");

const {
    getAllPlants,
    getPlantById
} = require("../../controllers/plant.controller");

const router = express.Router();

// Get all plants
router.get("/", getAllPlants);

// Get plant by ID
router.get("/:id", getPlantById);

module.exports = router;