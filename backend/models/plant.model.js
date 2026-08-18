const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        botanicalName: {
            type: String,
            trim: true
        },

        commonNames: {
            type: [String],
            default: []
        },

        habitat: {
            type: String,
            trim: true
        },

        medicinalUses: {
            type: [String],
            default: []
        },

        cultivationMethod: {
            type: String,
            trim: true
        },

        region: {
            type: String,
            trim: true
        },

        type: {
            type: String,
            trim: true
        },

        images: {
            type: [String],
            default: []
        },

        video: {
            type: String,
            default: ""
        },

        audio: {
            type: String,
            default: ""
        },

        model3D: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const plantModel = mongoose.model("Plant", plantSchema);

module.exports = plantModel;
