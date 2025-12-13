import express from "express";
import {
  getProfileController,
  updateProfile
} from "../../controllers/institute/profileController.js";

const router = express.Router();

router.get("/me", getProfileController);
router.put("/update", updateProfile);

export default router;
