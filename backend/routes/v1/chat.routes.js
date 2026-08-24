const express = require("express");

const protect = require("../../middleware/auth.middleware");
const { chat } = require("../../controllers/chat.controller");

const router = express.Router();

router.post(
    "/:conversationId",
    protect,
    chat
);

module.exports = router;