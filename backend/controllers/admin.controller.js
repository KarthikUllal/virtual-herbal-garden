const plantService = require("../services/plant.service");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

const adminTest = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Admin access granted",
        admin: {
            id: req.admin._id,
            name: req.admin.name,
            email: req.admin.email,
            role: req.admin.role
        }
    });
};


const createPlant = async (req, res) => {
    try {
        console.log("REQUEST BODY:", req.body);
        console.log("REQUEST FILES:", req.files);

        const {
            name,
            botanicalName,
            commonNames,
            habitat,
            medicinalUses,
            cultivationMethod,
            region,
            type
        } = req.body;

        // -----------------------------
        // Upload Images
        // -----------------------------

        const imageUrls = [];

        if (req.files?.images) {
            for (const file of req.files.images) {
                const result = await uploadToCloudinary(file.buffer, {
                    resource_type: "image",
                    folder: "plants"
                });

                imageUrls.push(result.secure_url);
            }
        }

        // -----------------------------
        // Upload Video
        // -----------------------------

        let videoUrl = "";

        if (req.files?.video?.[0]) {
            const result = await uploadToCloudinary(
                req.files.video[0].buffer,
                {
                    resource_type: "video",
                    folder: "videos"
                }
            );

            videoUrl = result.secure_url;
        }

        // -----------------------------
        // Upload Audio
        // -----------------------------

        let audioUrl = "";

        if (req.files?.audio?.[0]) {
            const result = await uploadToCloudinary(
                req.files.audio[0].buffer,
                {
                    resource_type: "video",
                    folder: "audio"
                }
            );

            audioUrl = result.secure_url;
        }

        // -----------------------------
        // Upload 3D Model
        // -----------------------------

        let model3DUrl = "";

        if (req.files?.model3D?.[0]) {
            const result = await uploadToCloudinary(
                req.files.model3D[0].buffer,
                {
                    resource_type: "raw",
                    folder: "models3d"
                }
            );

            model3DUrl = result.secure_url;
        }

        // -----------------------------
        // Convert arrays
        // -----------------------------

        const commonNamesArray = commonNames
            ? commonNames.split(",").map((item) => item.trim())
            : [];

        const medicinalUsesArray = medicinalUses
            ? medicinalUses.split(",").map((item) => item.trim())
            : [];

        // -----------------------------
        // Create plant
        // -----------------------------

        const plant = await plantService.createPlant({
            name,
            botanicalName,
            commonNames: commonNamesArray,
            habitat,
            medicinalUses: medicinalUsesArray,
            cultivationMethod,
            region,
            type,
            images: imageUrls,
            video: videoUrl,
            audio: audioUrl,
            model3D: model3DUrl
        });

        return res.status(201).json({
            success: true,
            message: "Plant created successfully",
            data: plant
        });

    } catch (error) {
        console.error("Error creating plant:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create plant",
            error: error.message
        });
    }
};


const updatePlant = async (req, res) => {
    try {
        console.log("UPDATE REQUEST BODY:", req.body);
        console.log("UPDATE REQUEST FILES:", req.files);

        const {
            name,
            botanicalName,
            commonNames,
            habitat,
            medicinalUses,
            cultivationMethod,
            region,
            type
        } = req.body;

        // Data that will be updated in MongoDB
        const updateData = {
            name,
            botanicalName,
            habitat,
            cultivationMethod,
            region,
            type
        };

        // -----------------------------
        // Convert arrays
        // -----------------------------

        if (commonNames !== undefined) {
            updateData.commonNames = commonNames
                ? commonNames.split(",").map((item) => item.trim())
                : [];
        }

        if (medicinalUses !== undefined) {
            updateData.medicinalUses = medicinalUses
                ? medicinalUses.split(",").map((item) => item.trim())
                : [];
        }

        // -----------------------------
        // Upload new Images
        // -----------------------------

        if (req.files?.images) {
            const imageUrls = [];

            for (const file of req.files.images) {
                const result = await uploadToCloudinary(file.buffer, {
                    resource_type: "image",
                    folder: "plants"
                });

                imageUrls.push(result.secure_url);
            }

            updateData.images = imageUrls;
        }

        // -----------------------------
        // Upload new Video
        // -----------------------------

        if (req.files?.video?.[0]) {
            const result = await uploadToCloudinary(
                req.files.video[0].buffer,
                {
                    resource_type: "video",
                    folder: "videos"
                }
            );

            updateData.video = result.secure_url;
        }

        // -----------------------------
        // Upload new Audio
        // -----------------------------

        if (req.files?.audio?.[0]) {
            const result = await uploadToCloudinary(
                req.files.audio[0].buffer,
                {
                    resource_type: "video",
                    folder: "audio"
                }
            );

            updateData.audio = result.secure_url;
        }

        // -----------------------------
        // Upload new 3D Model
        // -----------------------------

        if (req.files?.model3D?.[0]) {
            const result = await uploadToCloudinary(
                req.files.model3D[0].buffer,
                {
                    resource_type: "raw",
                    folder: "models3d"
                }
            );

            updateData.model3D = result.secure_url;
        }

        // -----------------------------
        // Update plant
        // -----------------------------

        const plant = await plantService.updatePlant(
            req.params.id,
            updateData
        );

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: "Plant not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plant updated successfully",
            data: plant
        });

    } catch (error) {
        console.error("Error updating plant:", error);

        return res.status(500).json({
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
    adminTest,
    createPlant,
    updatePlant,
    deletePlant
};