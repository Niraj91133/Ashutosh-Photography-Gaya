import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadMedia = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No file provided. Please attach a file to the request."
            });
        }

        console.log(`[Upload] Starting upload for: ${req.file.originalname}`);

        const { resource_type } = req.body;

        const options = {
            resource_type: resource_type || "auto",
            folder: "vishal_photography", // Centralize storage folder
            use_filename: true,
            unique_filename: true,
        };

        const result = await cloudinary.uploader.upload(req.file.path, options);

        // Delete local file asynchronously to not block response
        fs.unlink(req.file.path, (err) => {
            if (err) console.error(`[System] Failed to delete temp file: ${req.file.path}`, err);
        });

        console.log(`[Upload] Success: ${result.secure_url}`);

        return res.status(200).json({
            success: true,
            data: {
                url: result.secure_url,
                public_id: result.public_id,
                resource_type: result.resource_type,
                bytes: result.bytes,
                format: result.format
            }
        });

    } catch (error) {
        // Ensure cleanup even on failure
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error(`[Upload Service Error]`, error);
        next(error); // Pass to global error handler
    }
};
