const OpenAI = require("openai");

const provider = process.env.LLM_PROVIDER || "groq";

let llm;
let model;

if (provider === "groq") {
    llm = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
    });

    model = process.env.LLM_MODEL || "openai/gpt-oss-120b";
}

else if (provider === "nvidia") {
    llm = new OpenAI({
        apiKey: process.env.NVIDIA_API_KEY,
        baseURL: "https://integrate.api.nvidia.com/v1",
    });

    model =
        process.env.LLM_MODEL ||
        "nvidia/nemotron-3.5-lightning-30b-a3b";
}

else {
    throw new Error(`Unsupported LLM provider: ${provider}`);
}

module.exports = {
    llm,
    model,
};