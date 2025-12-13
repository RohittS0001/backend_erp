import { pool } from "../../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Count Students
    const [studentCount] = await pool.query(
      "SELECT COUNT(*) AS totalStudents FROM students"
    );

    // Count Faculty
    const [facultyCount] = await pool.query(
      "SELECT COUNT(*) AS totalFaculty FROM faculty"
    );

    // Count Courses
    const [courseCount] = await pool.query(
      "SELECT COUNT(*) AS totalCourses FROM courses"
    );

    // Count Events
    const [eventCount] = await pool.query(
      "SELECT COUNT(*) AS totalEvents FROM events"
    );

    // Count Notifications
    const [notifCount] = await pool.query(
      "SELECT COUNT(*) AS totalNotifications FROM notifications"
    );

    res.json({
      totalStudents: studentCount[0].totalStudents,
      totalFaculty: facultyCount[0].totalFaculty,
      totalCourses: courseCount[0].totalCourses,
      totalEvents: eventCount[0].totalEvents,
      totalNotifications: notifCount[0].totalNotifications,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
