const express = require("express");

const {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant
} = require("../../controllers/plant.controller");

const router = express.Router();

// Create plant
router.post("/", createPlant);

// Get all plants
router.get("/", getAllPlants);

// Get plant by ID
router.get("/:id", getPlantById);

// Update plant by ID
router.put("/:id", updatePlant);

// Delete plant by ID
router.delete("/:id", deletePlant);

module.exports = router;