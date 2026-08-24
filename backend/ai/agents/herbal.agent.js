const OpenAI = require("openai");

const { getPlantDetails } = require("../tools/plant.tool");
const { webSearch } = require("../tools/websearch.tool");
const { herbalSystemPrompt } = require("../prompts/herbal.prompt");

const nvidia = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: "https://integrate.api.nvidia.com/v1"
});

const plantTool = {
    type: "function",

    function: {
        name: "getPlantDetails",

        description:
            "Get detailed information about a medicinal plant from the Virtual Herbal Garden database.",

        parameters: {
            type: "object",

            properties: {
                plantName: {
                    type: "string",
                    description:
                        "The name of the medicinal plant to search for."
                }
            },

            required: ["plantName"]
        }
    }
};

const webSearchTool = {
    type: "function",

    function: {
        name: "webSearch",

        description:
            "Search the internet for current or additional information about medicinal plants. Use this when the user's question requires recent, external, or detailed information that may not be available in the plant database.",

        parameters: {
            type: "object",

            properties: {
                query: {
                    type: "string",
                    description:
                        "The search query to use when searching the web."
                }
            },

            required: ["query"]
        }
    }
};

const runHerbalAgent = async (message, previousMessages = []) => {
    try {
        const messages = [
            {
                role: "system",
                content: herbalSystemPrompt
            },
            ...previousMessages.map((msg) => ({
                role: msg.role,
                content: msg.content
            })),
            {
                role: "user",
                content: message
            }
        ];

        const response = await nvidia.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",

            messages,

            tools: [
                plantTool,
                webSearchTool
            ],

            tool_choice: "auto",

            temperature: 0.2,

            max_tokens: 1000
        });

        const assistantMessage = response.choices[0].message;

        if (
            !assistantMessage.tool_calls ||
            assistantMessage.tool_calls.length === 0
        ) {
            return assistantMessage.content;
        }

        const toolCall = assistantMessage.tool_calls[0];

        console.log("\nAI TOOL CALL:");
        console.log(toolCall);

        messages.push(assistantMessage);

        const toolName = toolCall.function.name;

        const args = JSON.parse(
            toolCall.function.arguments
        );

        let toolResult;

        if (toolName === "getPlantDetails") {

            const plantName = args.plantName;

            console.log("\nPLANT NAME:");
            console.log(plantName);

            toolResult = await getPlantDetails(
                plantName
            );

            console.log("\nPLANT TOOL RESULT:");
            console.log(toolResult);
        }

        else if (toolName === "webSearch") {

            const query = args.query;

            console.log("\nWEB SEARCH QUERY:");
            console.log(query);

            toolResult = await webSearch(
                query
            );

            console.log("\nWEB SEARCH TOOL RESULT:");
            console.log(toolResult);
        }

        else {
            toolResult = {
                success: false,
                message: `Unknown tool: ${toolName}`
            };
        }

        messages.push({
            role: "tool",

            tool_call_id: toolCall.id,

            content: JSON.stringify(toolResult)
        });

        const finalResponse =
            await nvidia.chat.completions.create({
                model: "meta/llama-3.1-8b-instruct",

                messages,

                temperature: 0.2,

                max_tokens: 1000
            });

        return finalResponse.choices[0].message.content;

    } catch (error) {

        console.error(
            "Herbal agent error:",
            error.response?.data || error.message
        );

        throw new Error(
            "Failed to run herbal AI agent"
        );
    }
};

module.exports = {
    runHerbalAgent
};

