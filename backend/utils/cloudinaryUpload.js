const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: options.resource_type || "auto",
                folder: options.folder || "plants"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;