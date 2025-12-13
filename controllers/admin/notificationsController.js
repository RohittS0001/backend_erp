import {
  getAllNotifications,
  createNotification
} from "../../models/admin/Notification.js";

// Get all notifications
export const getAllNotificationsHandler = async (req, res) => {
  try {
    const notifications = await getAllNotifications();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

// Create a new notification
export const createNotificationHandler = async (req, res) => {
  try {
    const saved = await createNotification(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add notification" });
  }
};
