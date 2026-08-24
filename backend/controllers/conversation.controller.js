const Conversation = require("../models/conversation.model");

const createConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            userId: req.user.userId,
            title: "New Conversation"
        });

        res.status(201).json({
            success: true,
            data: conversation
        });

    } catch (error) {
        console.error("Create conversation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create conversation"
        });
    }
};

const getConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

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

        res.status(200).json({
            success: true,
            data: conversation
        });

    } catch (error) {
        console.error("Get conversation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get conversation"
        });
    }
};

module.exports = {
    createConversation,
    getConversation
};