require("dotenv").config();

const { generateResponse } = require("../services/ai.service");

const test = async () => {
    try {
        const response = await generateResponse(
            "What is a medicinal plant? Give me a short answer."
        );

        console.log("GEMINI RESPONSE:");
        console.log(response);
    } catch (error) {
        console.error("TEST ERROR:", error.message);
    }
};

test();