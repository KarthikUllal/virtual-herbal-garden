const userService = require("../services/user.service");

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await userService.getUserProfile(userId);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Get profile error:", error);

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProfile
};