import express from "express";
import {
  getInstituteDashboard,
  getInstituteProfile,
  updateInstituteProfile
} from "../controllers/instituteController.js";

const router = express.Router();

// 📌 Dashboard Summary API
router.get("/dashboard", getInstituteDashboard);

// 📌 Get Institute Profile
router.get("/profile", getInstituteProfile);

// 📌 Update Institute Profile
router.put("/profile/update", updateInstituteProfile);

export default router;
 