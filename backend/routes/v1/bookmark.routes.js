const express = require("express");

const protect = require("../../middleware/auth.middleware");

const {
    addBookmark,
    removeBookmark,
    getUserBookmarks,
    checkBookmark
} = require("../../controllers/bookmark.controller");

const router = express.Router();

// Get all bookmarks of logged-in user
router.get("/", protect, getUserBookmarks);

// Check if a specific plant is bookmarked
router.get("/:plantId", protect, checkBookmark);

// Add bookmark
router.post("/:plantId", protect, addBookmark);

// Remove bookmark
router.delete("/:plantId", protect, removeBookmark);

module.exports = router;