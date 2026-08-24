require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const test = async () => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents:
                "Search the web and give me additional information about Tulsi medicinal plant.",

            config: {
                tools: [
                    {
                        googleSearch: {}
                    }
                ]
            }
        });

        console.log("\nGOOGLE SEARCH RESULT:");
        console.log(response.text);

    } catch (error) {
        console.error("Google Search error:", error);
    }
};

test();