import express from "express";
import { requireRole } from "../../middleware/requireRole.js";
import {
  createRecruiter,
  getRecruiters,
  getRecruiterById,
  updateRecruiter,
  deleteRecruiter,
} from "../controllers/recruiterController.js";

const router = express.Router();

router.post("/create", requireRole("Admin"), createRecruiter);
router.get("/", requireRole("Admin"), getRecruiters);
router.get("/:id", getRecruiterById);
router.put("/:id", requireRole("Admin"), updateRecruiter);
router.delete("/:id", requireRole("Admin"), deleteRecruiter);

export default router;
