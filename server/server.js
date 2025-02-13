import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import verifyToken from "../middleware/verifyToken.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

dotenv.config();

const allowedOrigin = process.env.BASE_URL;

const app = express();

// Enable CORS
app.use(
  cors({
    origin: allowedOrigin, // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Debugging logs
console.log("✅ Registered Routes:");
console.log(" - /api/users");
console.log(" - /api/payments");
console.log(" - /webhooks");
console.log(" - /api/recruiters (protected)");
console.log(" - /api/quizzes (protected)");
console.log(" - /api/admin (protected)");

// PUBLIC routes
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes); // 👈 Payment routes are under "/api/payments"
app.use("/webhooks", webhookRoutes);

// PROTECTED routes (require valid token)
app.use("/api/recruiters", verifyToken, recruiterRoutes);
app.use("/api/quizzes", verifyToken, quizRoutes);
app.use("/api/admin", verifyToken, adminRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Failed to connect to MongoDB", err));
