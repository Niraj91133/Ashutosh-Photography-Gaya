import express from "express";
import multer from "multer";
import { uploadMedia } from "../controllers/upload.js";
import path from "path";

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/cloudinary-upload", upload.single("file"), uploadMedia);

export default router;
