// routes/immersionRoutes.js
import express from "express";
import multer from "multer";
import {
  addIndustryApplication,
  listIndustryApplications,
  addAcademicApplication,
  listAcademicApplications
} from "../../controllers/user/immersionController.js";

const router = express.Router();

// Multer for resume uploads
const upload = multer({
  dest: "uploads/resumes/"
});

// Industry Application
router.get("/immersion/industry-applications", listIndustryApplications);
router.post(
  "/immersion/industry-applications",
  upload.single("industryResume"),
  addIndustryApplication
);

// Academic Application
router.get("/immersion/academic-applications", listAcademicApplications);
router.post("/immersion/academic-applications", addAcademicApplication);

export default router;
