const plantService = require("../services/plant.service");

const createPlant = async (req, res) => {
    try {
         console.log("REQUEST BODY:", req.body);
        const plant = await plantService.createPlant(req.body);

        res.status(201).json({
            success: true,
            message: "Plant created successfully",
            data: plant
        });
    } catch (error) {
        console.error("Error creating plant:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create plant",
            error: error.message
        });
    }
};

const getAllPlants = async (req, res) => {
    try {
        const plants = await plantService.getAllPlants(req.query);

        res.status(200).json({
            success: true,
            count: plants.length,
            data: plants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch plants",
            error: error.message
        });
    }
};

const getPlantById = async (req, res) => {
    try {
        const plant = await plantService.getPlantById(req.params.id);

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: "Plant not found"
            });
        }

        res.status(200).json({
            success: true,
            data: plant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch plant",
            error: error.message
        });
    }
};

const updatePlant = async (req, res) => {
    try {
        const plant = await plantService.updatePlant(
            req.params.id,
            req.body
        );

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: "Plant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Plant updated successfully",
            data: plant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update plant",
            error: error.message
        });
    }
};

const deletePlant = async (req, res) => {
    try {
        const plant = await plantService.deletePlant(req.params.id);

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: "Plant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Plant deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete plant",
            error: error.message
        });
    }
};

module.exports = {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant
};