import express from "express";
import {
  getProfilesHandler,
  createProfileHandler,
  getProfileByIdHandler,
  updateProfileHandler,
  deleteProfileHandler
} from "../../controllers/user/profileController.js";

const router = express.Router();

router.get("/", getProfilesHandler);
router.post("/", createProfileHandler);

router.get("/:id", getProfileByIdHandler);
router.put("/:id", updateProfileHandler);
router.delete("/:id", deleteProfileHandler);

export default router;
