import express from "express";
import {
  getInstituteDashboard,
  getInstituteProfile,
  updateInstituteProfile
} from "../controllers/instituteController.js";

const router = express.Router();

// Dashboard Summary
router.get("/dashboard", getInstituteDashboard);

// Institute Profile
router.get("/profile", getInstituteProfile);
router.put("/profile/update", updateInstituteProfile);

export default router;
