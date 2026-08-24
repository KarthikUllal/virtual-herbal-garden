const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const { runHerbalAgent } = require("../ai/agents/herbal.agent");

const chat = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { message } = req.body;

        // 1. Check conversation belongs to logged-in user
        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user.userId
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            });
        }

        // 2. Save user's message
        await Message.create({
            conversationId,
            role: "user",
            content: message
        });

        // 3. Get previous messages
        const previousMessages = await Message.find({
            conversationId
        }).sort({
            createdAt: 1
        });

        // 4. Send conversation history to AI
        const aiResponse = await runHerbalAgent(
            message,
            previousMessages
        );

        // 5. Save AI response
        const assistantMessage = await Message.create({
            conversationId,
            role: "assistant",
            content: aiResponse
        });

        // 6. Return response
        res.status(200).json({
            success: true,
            data: assistantMessage
        });

    } catch (error) {
        console.error("Chat error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to process chat"
        });
    }
};

module.exports = {
    chat
};