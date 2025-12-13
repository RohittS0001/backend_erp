import { pool } from "../../config/db.js";  // ✅ CORRECT


// Add notification
export const addNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      title: req.body.title,
      message: req.body.message,
      type: req.body.type || "General",
      date: req.body.date || new Date(),
    });

    return res.json({ success: true, notification });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const list = await Notification.findAll({
      order: [["date", "DESC"]]
    });

    return res.json({ success: true, notifications: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
