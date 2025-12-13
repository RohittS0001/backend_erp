import { getUserCount } from "../../models/admin/User.js";
import { getCourseCount } from "../../models/admin/Course.js";
import { getActiveNotificationCount } from "../../models/admin/Notification.js";
import { getFinancialTotal } from "../../models/admin/Financial.js";
import { getAllInstitutes } from "../../models/admin/Institute.js";

// Dashboard data controller for MySQL
export const getDashboardData = async (req, res) => {
  try {
    const usersCount = await getUserCount();
    const coursesCount = await getCourseCount();
    const notificationsCount = await getActiveNotificationCount();
    const financialSum = await getFinancialTotal();
    const institutes = await getAllInstitutes();

    res.json({
      usersCount,
      coursesCount,
      notificationsCount,
      financialSum,
      institutes,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
