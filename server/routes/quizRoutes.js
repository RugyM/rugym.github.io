// server/routes/quizRoutes.js

import express from "express";
import verifyToken from "../../middleware/verifyToken.js"; // Add this import
import { requireRole } from "../../middleware/requireRole.js";
import {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizById,
  getAllQuizzes,
  submitQuiz,
  giveFeedback,
} from "../controllers/quizController.js";

const router = express.Router();

// Create a quiz - allowed for both Recruiters and Admins
router.post(
  "/create",
  verifyToken,
  requireRole(["Admin", "Recruiter"]),
  createQuiz,
);

// Update quiz
router.put(
  "/:id",
  verifyToken,
  requireRole(["Admin", "Recruiter"]),
  updateQuiz,
);

// Other routes...
router.get("/:id", getQuizById);
router.delete("/:id", deleteQuiz);
router.put(
  "/:quizId/feedback",
  verifyToken,
  requireRole(["Admin", "Recruiter"]),
  giveFeedback
);
router.get(
  "/",
  verifyToken,
  requireRole(["Admin", "Recruiter"]),
  getAllQuizzes,
);
router.post("/:id/submit", verifyToken, submitQuiz);

export default router;
