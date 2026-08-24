const OpenAI = require("openai");

const nvidia = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: "https://integrate.api.nvidia.com/v1"
});

const generateNvidiaResponse = async (message) => {
    try {
        const response = await nvidia.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",

            messages: [
                {
                    role: "user",
                    content: message
                }
            ],

            temperature: 0.2,
            max_tokens: 500
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error(
            "NVIDIA API error:",
            error.response?.data || error.message
        );

        throw new Error("Failed to generate NVIDIA response");
    }
};

module.exports = {
    generateNvidiaResponse
};