require("dotenv").config();

const {
    webSearch
} = require("../tools/websearch.tool");

const test = async () => {
    try {
        const result = await webSearch(
            "recent information about Tulsi medicinal plant"
        );

        console.log("\nWEB SEARCH RESULT:\n");
        console.dir(result, { depth: null });

    } catch (error) {
        console.error("TEST ERROR:", error);
    }
};

test();