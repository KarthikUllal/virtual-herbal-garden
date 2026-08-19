const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        plant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plant",
            required: true
        }
    },
    {
        timestamps: true
    }
);

bookmarkSchema.index(
    { user: 1, plant: 1 },
    { unique: true }
);

const bookmarkModel = mongoose.model(
    "Bookmark",
    bookmarkSchema
);

module.exports = bookmarkModel;