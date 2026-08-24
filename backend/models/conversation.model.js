const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true
        },

        content: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

const conversationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            default: "New Conversation"
        },

        messages: {
            type: [messageSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Conversation = mongoose.model(
    "Conversation",
    conversationSchema
);

module.exports = Conversation;