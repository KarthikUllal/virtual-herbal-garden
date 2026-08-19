const bookmarkModel = require("../models/bookmark.model");

const addBookmark = async (userId, plantId) => {
    const existingBookmark = await bookmarkModel.findOne({
        user: userId,
        plant: plantId
    });

    if (existingBookmark) {
        throw new Error("Plant is already bookmarked");
    }

    const bookmark = await bookmarkModel.create({
        user: userId,
        plant: plantId
    });

    return bookmark;
};

const removeBookmark = async (userId, plantId) => {
    const bookmark = await bookmarkModel.findOneAndDelete({
        user: userId,
        plant: plantId
    });

    if (!bookmark) {
        throw new Error("Bookmark not found");
    }

    return bookmark;
};

const getUserBookmarks = async (userId) => {
    const bookmarks = await bookmarkModel
        .find({ user: userId })
        .populate("plant");

    return bookmarks;
};

const checkBookmark = async (userId, plantId) => {
    const bookmark = await bookmarkModel.findOne({
        user: userId,
        plant: plantId
    });

    return !!bookmark;
};

module.exports = {
    addBookmark,
    removeBookmark,
    getUserBookmarks,
    checkBookmark
};