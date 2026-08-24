const express = require("express");

const {
    createConversation,
    getConversation
} = require("../../controllers/conversation.controller");

const protect = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createConversation);

router.get("/:conversationId", protect, getConversation);

module.exports = router;