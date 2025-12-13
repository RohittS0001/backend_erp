import express from "express";
import {
  getDashboardDataHandler,
  getRecentActivityHandler
} from "../../controllers/user/userDashboardController.js";

const router = express.Router();

router.get("/", getDashboardDataHandler);
router.get("/activity", getRecentActivityHandler);

export default router;
