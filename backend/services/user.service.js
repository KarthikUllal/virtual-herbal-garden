const userModel = require("../models/user.model");

const getUserProfile = async (userId) => {
    const user = await userModel
        .findById(userId)
        .select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    getUserProfile
};