const { llm, model } = require("../../config/llm");

const { getPlantDetails } = require("../tools/plant.tool");
const { webSearch } = require("../tools/websearch.tool");

const {
    plantTool,
    webSearchTool
} = require("../tools/tool.definitions");

const {
    herbalSystemPrompt
} = require("../prompts/herbal.prompt");

const {
    cleanMarkdown
} = require("../../utils/markdown.util");

const tools = [
    plantTool,
    webSearchTool
];

const runHerbalAgent = async (
    message,
    previousMessages = []
) => {
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

        const sources = [];

        const maxIterations = 4;

        for (
            let iteration = 0;
            iteration < maxIterations;
            iteration++
        ) {
            const response =
                await llm.chat.completions.create({
                    model,

                    messages,

                    tools,

                    tool_choice: "auto",

                    temperature: 0.2,

                    max_tokens: 1500
                });

            const assistantMessage =
                response.choices[0].message;

            if (
                !assistantMessage.tool_calls ||
                assistantMessage.tool_calls.length === 0
            ) {
                return {
                    content: cleanMarkdown(
                        assistantMessage.content
                    ),
                    sources
                };
            }

            console.log("\nAI TOOL CALLS:");

            console.dir(
                assistantMessage.tool_calls,
                {
                    depth: null
                }
            );

            messages.push(assistantMessage);

            for (
                const toolCall
                of assistantMessage.tool_calls
            ) {
                const toolName =
                    toolCall.function.name;

                let args;

                try {
                    args = JSON.parse(
                        toolCall.function.arguments
                    );
                } catch (error) {
                    console.error(
                        "Invalid tool arguments:",
                        toolCall.function.arguments
                    );

                    messages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        content: JSON.stringify({
                            success: false,
                            message:
                                "Invalid tool arguments"
                        })
                    });

                    continue;
                }

                let toolResult;

                if (
                    toolName ===
                    "getPlantDetails"
                ) {
                    console.log(
                        "\nPLANT NAME:"
                    );

                    console.log(
                        args.plantName
                    );

                    toolResult =
                        await getPlantDetails(
                            args.plantName
                        );

                    console.log(
                        "\nPLANT TOOL RESULT:"
                    );

                    console.log(
                        toolResult
                    );
                }

                else if (
                    toolName ===
                    "webSearch"
                ) {
                    console.log(
                        "\nWEB SEARCH QUERY:"
                    );

                    console.log(
                        args.query
                    );

                    toolResult =
                        await webSearch(
                            args.query
                        );

                    console.log(
                        "\nWEB SEARCH TOOL RESULT:"
                    );

                    console.log(
                        toolResult
                    );

                    if (
                        toolResult.success &&
                        toolResult.results
                    ) {
                        toolResult.results.forEach(
                            (result) => {
                                if (
                                    result.url &&
                                    !sources.some(
                                        (source) =>
                                            source.url ===
                                            result.url
                                    )
                                ) {
                                    sources.push({
                                        id: `source-${sources.length + 1}`,
                                        title:
                                            result.title,
                                        url:
                                            result.url
                                    });
                                }
                            }
                        );
                    }
                }

                else {
                    toolResult = {
                        success: false,
                        message:
                            `Unknown tool: ${toolName}`
                    };
                }

                messages.push({
                    role: "tool",
                    tool_call_id:
                        toolCall.id,
                    content:
                        JSON.stringify(
                            toolResult
                        )
                });
            }
        }

        return {
            content: cleanMarkdown(
                "I couldn't complete the request."
            ),
            sources
        };

    } catch (error) {
        console.error(
            "Herbal agent error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Failed to run herbal AI agent"
        );
    }
};

module.exports = {
    runHerbalAgent
};