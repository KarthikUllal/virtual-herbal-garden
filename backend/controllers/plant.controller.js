const plantService = require("../services/plant.service");

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

module.exports = {
    getAllPlants,
    getPlantById
};