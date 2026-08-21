const userModel = require("../models/user.model");

const admin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        req.admin = user;

        next();
    } catch (error) {
        console.error("Admin middleware error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = admin;