import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getQuizForGuest,
  attemptQuiz,
  executeCode,
} from "../controllers/userController.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Get user profile by ID
router.get("/:id/profile", getUserProfile);

// Update user profile by ID
router.put("/:id/profile", updateUserProfile);

// Guest routes for attempting quizzes
// router.get("/guest/:id", getQuizForGuest);
// router.post("/guest/:id/attempt", attemptQuiz);
// Updated routes
router.get("/guest/attempt-quiz/:id/:studentId", getQuizForGuest);
router.post("/guest/attempt-quiz/:id/:studentId/attempt", attemptQuiz);

// Route for code execution
router.post("/execute-code", executeCode);

export default router;
