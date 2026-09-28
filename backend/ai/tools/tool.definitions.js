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

module.exports = {
    plantTool,
    webSearchTool
};