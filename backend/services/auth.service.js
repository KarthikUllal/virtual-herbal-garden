const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
require("dotenv").config();

const registerUser = async (name, email, password) => {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};


const loginUser = async (email, password) => {
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};


module.exports = {
    registerUser,
    loginUser
};