const express = require("express");

const {
    createMessage,
    getMessages
} = require("../../controllers/message.controller");

const protect = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/:conversationId",
    protect,
    createMessage
);

router.get(
    "/:conversationId",
    protect,
    getMessages
);

module.exports = router;