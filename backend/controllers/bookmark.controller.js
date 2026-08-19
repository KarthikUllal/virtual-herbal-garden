const bookmarkService = require("../services/bookmark.service");

const addBookmark = async (req, res) => {
    try {
        const { plantId } = req.params;
        const userId = req.user.userId;

        const bookmark = await bookmarkService.addBookmark(
            userId,
            plantId
        );

        res.status(201).json({
            success: true,
            message: "Plant bookmarked successfully",
            data: bookmark
        });
    } catch (error) {
        console.error("Add bookmark error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const removeBookmark = async (req, res) => {
    try {
        const { plantId } = req.params;
        const userId = req.user.userId;

        await bookmarkService.removeBookmark(
            userId,
            plantId
        );

        res.status(200).json({
            success: true,
            message: "Bookmark removed successfully"
        });
    } catch (error) {
        console.error("Remove bookmark error:", error);

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const getUserBookmarks = async (req, res) => {
    try {
        const userId = req.user.userId;

        const bookmarks =
            await bookmarkService.getUserBookmarks(userId);

        res.status(200).json({
            success: true,
            data: bookmarks
        });
    } catch (error) {
        console.error("Get bookmarks error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const checkBookmark = async (req, res) => {
    try {
        const { plantId } = req.params;
        const userId = req.user.userId;

        const bookmarked =
            await bookmarkService.checkBookmark(
                userId,
                plantId
            );

        res.status(200).json({
            success: true,
            data: {
                bookmarked
            }
        });
    } catch (error) {
        console.error("Check bookmark error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addBookmark,
    removeBookmark,
    getUserBookmarks,
    checkBookmark
};