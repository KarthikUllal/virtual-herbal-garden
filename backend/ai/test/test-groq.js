const OpenAI = require("openai");
require("dotenv").config();

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const testTool = {
    type: "function",
    function: {
        name: "getPlantDetails",
        description: "Get information about a medicinal plant.",
        parameters: {
            type: "object",
            properties: {
                plantName: {
                    type: "string",
                    description: "Name of the medicinal plant",
                },
            },
            required: ["plantName"],
        },
    },
};

async function testGroq() {
    try {
        console.log("Testing Groq...\n");

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",

            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful herbal assistant. Use the tool when the user asks about a specific plant.",
                },
                {
                    role: "user",
                    content:
                        "Tell me about Tulsi and its medicinal uses.",
                },
            ],

            tools: [testTool],

            tool_choice: "auto",

            temperature: 0.2,

            max_tokens: 1000,
        });

        console.dir(response, { depth: null });

        const message = response.choices[0].message;

        console.log("\n--- MESSAGE ---");
        console.log(message);

        if (message.tool_calls) {
            console.log("\n✅ TOOL CALL DETECTED");

            console.log(
                "Tool:",
                message.tool_calls[0].function.name
            );

            console.log(
                "Arguments:",
                message.tool_calls[0].function.arguments
            );
        } else {
            console.log("\nℹ️ No tool call.");
            console.log("Response:", message.content);
        }

    } catch (error) {
        console.error("\n❌ GROQ ERROR:");
        console.error(error.response?.data || error.message);
    }
}

testGroq();