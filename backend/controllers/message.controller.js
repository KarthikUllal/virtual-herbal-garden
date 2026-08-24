const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

const createMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { role, content } = req.body;

        // Check that the conversation belongs to the logged-in user
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

        const message = await Message.create({
            conversationId,
            role,
            content
        });

        res.status(201).json({
            success: true,
            data: message
        });

    } catch (error) {
        console.error("Create message error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create message"
        });
    }
};


const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        // Make sure the conversation belongs to the logged-in user
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

        const messages = await Message.find({
            conversationId
        }).sort({
            createdAt: 1
        });

        res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {
        console.error("Get messages error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get messages"
        });
    }
};


module.exports = {
    createMessage,
    getMessages
};