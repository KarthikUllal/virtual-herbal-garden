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

        const results = response.results.map((result, index) => ({
            id: `source-${index + 1}`,
            title: result.title,
            url: result.url,
            content: result.content
        }));

        return {
            success: true,
            results
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