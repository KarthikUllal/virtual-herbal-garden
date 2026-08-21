const express = require("express");

const protect = require("../../middleware/auth.middleware");
const admin = require("../../middleware/admin.middleware");
const upload = require("../../middleware/upload.middleware");

const {
    adminTest,
    createPlant,
    updatePlant,
    deletePlant
} = require("../../controllers/admin.controller");

const router = express.Router();

// Admin test
router.get("/test", protect, admin, adminTest);

// Create plant
router.post(
    "/plants",
    protect,
    admin,
    upload.fields([
        { name: "images", maxCount: 5 },
        { name: "video", maxCount: 1 },
        { name: "audio", maxCount: 1 },
        { name: "model3D", maxCount: 1 }
    ]),
    createPlant
);

// Update plant
router.put(
    "/plants/:id",
    protect,
    admin,
    upload.fields([
        { name: "images", maxCount: 5 },
        { name: "video", maxCount: 1 },
        { name: "audio", maxCount: 1 },
        { name: "model3D", maxCount: 1 }
    ]),
    updatePlant
);

// Delete plant
router.delete(
    "/plants/:id",
    protect,
    admin,
    deletePlant
);

module.exports = router;