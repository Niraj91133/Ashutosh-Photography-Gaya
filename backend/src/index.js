import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors({
    origin: "*", // Adjust for production security
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "Online",
        service: "Vishal Photography Backend",
        uptime: process.uptime()
    });
});

// Routes
app.use("/api", uploadRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: "Route not found" });
});

// Error Handler (Must be last)
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`
    =========================================
    🚀 Backend Architecture Expert Status:
    
    SERVER: RUNNING
    PORT: ${PORT}
    ENVIRONMENT: ${process.env.NODE_ENV || 'production'}
    LOGS: ENABLED
    =========================================
    `);
});
