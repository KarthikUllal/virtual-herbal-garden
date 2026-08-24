const { runHerbalAgent } = require("../agents/herbal.agent");

const test = async () => {
    try {
        const response = await runHerbalAgent(
            "Tell me about Tulsi"
        );

        console.log("\nFINAL AI RESPONSE:\n");
        console.log(response);

    } catch (error) {
        console.error("AGENT TEST ERROR:", error);
    }
};

test();