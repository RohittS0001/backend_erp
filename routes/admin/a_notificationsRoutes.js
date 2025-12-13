// backend/routes/admin/notificationsRoutes.js
import express from "express";
import {
  getAllNotificationsHandler,
  createNotificationHandler
} from "../../controllers/admin/notificationsController.js";

const router = express.Router();

router.get("/", getAllNotificationsHandler);   // List notifications
router.post("/", createNotificationHandler);   // Add notification

export default router;
