const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },

        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true
        },

        content: {
            type: String,
            required: true
        },

        sources: [
            {
                id: String,
                title: String,
                url: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Message",
    messageSchema
);