const { tavily } = require("@tavily/core");

const tavilyClient = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

const webSearch = async (query) => {
    try {
        const response = await tavilyClient.search(query, {
            searchDepth: "basic",
            maxResults: 5
        });

        return {
            success: true,
            data: response.results
        };

    } catch (error) {
        console.error("Web search error:", error);

        return {
            success: false,
            message: "Failed to perform web search"
        };
    }
};

module.exports = {
    webSearch
};