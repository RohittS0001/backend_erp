import express from "express";
import {
  addNotification,
  getNotifications
} from "../../controllers/institute/notificationController.js";

const router = express.Router();

router.post("/add", addNotification);
router.get("/all", getNotifications);

export default router;
