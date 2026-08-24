const plantModel = require("../../models/plant.model");

const getPlantDetails = async (plantName) => {
    try {
        const plant = await plantModel.findOne({
            name: {
                $regex: `^${plantName}$`,
                $options: "i"
            }
        }).lean();

        if (!plant) {
            return {
                success: false,
                message: `Plant "${plantName}" was not found`
            };
        }

        return {
            success: true,

            data: {
                name: plant.name,
                botanicalName: plant.botanicalName,
                commonNames: plant.commonNames,
                habitat: plant.habitat,
                medicinalUses: plant.medicinalUses,
                cultivationMethod: plant.cultivationMethod,
                region: plant.region,
                type: plant.type
            }
        };

    } catch (error) {
        console.error("AI plant tool error:", error);

        return {
            success: false,
            message: "Failed to retrieve plant information"
        };
    }
};

module.exports = {
    getPlantDetails
};