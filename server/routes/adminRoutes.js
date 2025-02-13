import express from "express";
import { requireRole } from "../../middleware/requireRole.js";
import {
  getAllRecruiters,
  getAllQuizzes,
  deleteRecruiter,
  deleteQuiz,
  createRecruiter,
  updateRecruiter,
  bulkDeleteRecruiters,
  bulkDeleteQuizzes,
  getDashboardData,
} from "../controllers/adminController.js";

const router = express.Router();

// Admin routes
router.get("/recruiter", requireRole("Admin"), getAllRecruiters);
router.post("/recruiter", requireRole("Admin"), createRecruiter);
router.put("/recruiter/:id", requireRole("Admin"), updateRecruiter);
router.delete("/recruiter/:id", requireRole("Admin"), deleteRecruiter);
router.get("/quizzes", requireRole("Admin"), getAllQuizzes);
router.delete("/quizzes/:id", requireRole("Admin"), deleteQuiz);
router.post("/recruiters/bulk-delete", requireRole("Admin"), bulkDeleteRecruiters);
router.post("/quizzes/bulk-delete", requireRole("Admin"), bulkDeleteQuizzes);

router.get("/dashboard", requireRole("Admin"), getDashboardData);

export default router;
