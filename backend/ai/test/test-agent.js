require("dotenv").config();

const {
    runHerbalAgent
} = require("../agents/herbal.agent");
const connectDB = require("../../config/db");
const test = async () => {
    try {
        await connectDB();

        const response = await runHerbalAgent(
            "What about its cultivation?"
        );

        console.log("\nFINAL AI RESPONSE:\n");
        console.log(response);

    } catch (error) {
        console.error("AGENT TEST ERROR:", error);
    }
};

test();