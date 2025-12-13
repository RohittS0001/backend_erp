import express from "express";
import { getSettingsHandler, saveSettingsHandler } from "../../controllers/admin/settingsController.js";

const router = express.Router();

router.get("/", getSettingsHandler);
router.post("/", saveSettingsHandler);

export default router;
