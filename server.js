
// ---------------------- CORE IMPORTS -------------------
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// ---------------------- ADMIN TABLES -------------------
import { ensureCourseTableExists } from "./models/admin/Course.js";
import { ensureFinancialTableExists } from "./models/admin/Financial.js";
import { ensureInstituteTableExists } from "./models/admin/Institute.js";
import { ensureNotificationTableExists } from "./models/admin/Notification.js";
import { ensureReportTableExists } from "./models/admin/Report.js";
import { ensureSettingTableExists } from "./models/admin/Setting.js";
import { ensureUserTableExists } from "./models/admin/User.js";
import { ensureAdminTableExists } from "./models/adminmodels.js";

// ---------------------- USER TABLES --------------------
import { ensureu_UserTableExists } from "./models/user/UserDashboard.js";
import { ensureUsersIDsTableExists } from "./models/usermodels.js";
import { ensureProfileTableExists } from "./models/user/Profile.js";
import { ensureMembershipTableExists } from "./models/user/Membership.js";
import { ensureImmersionTableExists } from "./models/user/Immersion.js";
import { ensureMOUTableExists } from "./models/user/MOU.js";
import { ensureDonationTableExists } from "./models/user/Donation.js";
import { ensurePlacementTableExists } from "./models/user/Placement.js";
import { ensureResearchTableExists } from "./models/user/Research.js";

// ---------------------- INSTITUTE TABLES ----------------
import { ensureDepartmentTableExists } from "./models/institute/department.js";
import { ensureStudentTableExists } from "./models/institute/Student.js";
import { ensureFacultyTableExists } from "./models/institute/Faculty.js";
import { ensureCourseTableExists as ensureInstituteCourseTable } from "./models/institute/Course.js";
import { ensureAttendanceTable } from "./models/institute/attendance.js";
import { ensureEventTableExists } from "./models/institute/Event.js";
import { ensureProfileTableExists as ensureInstituteProfileTableExists } from "./models/institute/profile.js";
import { ensureReportsTableExists } from "./models/institute/Report.js";

// ---------------------- ROUTES -------------------------
import adminRoutes from "./routes/adminRoutes.js";
import aCoursesRoutes from "./routes/admin/a_coursesRoutes.js";
import aDashboardRoutes from "./routes/admin/a_dashboardRoutes.js";
import aFinancialsRoutes from "./routes/admin/a_financialsRoutes.js";
import aInstitutesRoutes from "./routes/admin/a_institutesRoutes.js";
import aNotificationsRoutes from "./routes/admin/a_notificationsRoutes.js";
import aReportsRoutes from "./routes/admin/a_reportsRoutes.js";
import aSettingsRoutes from "./routes/admin/a_settingsRoutes.js";
import aUsersRoutes from "./routes/admin/a_usersRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import UprofileRoutes from "./routes/user/U_profileRoutes.js";
import membershipRoutes from "./routes/user/membershipRoutes.js";
import immersionRoutes from "./routes/user/immersionRoutes.js";
import mouRoutes from "./routes/user/mouRoutes.js";
import donationRoutes from "./routes/user/donationRoutes.js";
import placementRoutes from "./routes/user/placementRoutes.js";
import researchRoutes from "./routes/user/researchRoutes.js";

import departmentRoutes from "./routes/institute/departmentRoute.js";
import studentRoutes from "./routes/institute/studentmanagementRoute.js";
import facultyRoutes from "./routes/institute/facultyRoute.js";
import courseRoute from "./routes/institute/courseRoute.js";
import attendanceRoutes from "./routes/institute/attendenceRoute.js";
import eventRoutes from "./routes/institute/eventRoute.js";
import profileRoutes from "./routes/institute/profileRoute.js";
import notificationRoutes from "./routes/institute/notificationRoute.js";
import reportRoutes from "./routes/institute/reportsRoute.js";
import dashboardRoutes from "./routes/institute/dashboardRoute.js";

// ---------------------- APP SETUP -----------------------
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ---------------------- HEALTH CHECK --------------------
app.get("/", (_req, res) => {
  res.send("INSTITUTE ERP – MySQL Backend Running ✅");
});

// ---------------------- START SERVER --------------------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // ---- DB CONNECTION (RAILWAY SAFE) ----
  try {
    await connectDB();
    console.log("✅ MySQL Connected Successfully");
  } catch (err) {
    console.log("❌ MySQL Connection Error:", err.message);
    console.log("⚠️ DB warning – continuing startup");
  }

  // ---- TABLE CREATION (SAFE) ----
  const safe = async (fn, name) => {
    try {
      await fn();
      console.log(`✅ ${name}`);
    } catch {
      console.log(`⚠️ ${name} skipped`);
    }
  };

  // ADMIN TABLES
  await safe(ensureCourseTableExists, "Admin Course table");
  await safe(ensureFinancialTableExists, "Admin Financial table");
  await safe(ensureInstituteTableExists, "Admin Institute table");
  await safe(ensureNotificationTableExists, "Admin Notification table");
  await safe(ensureReportTableExists, "Admin Report table");
  await safe(ensureSettingTableExists, "Admin Setting table");
  await safe(ensureUserTableExists, "Admin User table");
  await safe(ensureAdminTableExists, "Admin Admin table");

  // INSTITUTE TABLES
  await safe(ensureDepartmentTableExists, "Institute Department table");
  await safe(ensureStudentTableExists, "Institute Student table");
  await safe(ensureFacultyTableExists, "Institute Faculty table");
  await safe(ensureInstituteCourseTable, "Institute Course table");
  await safe(ensureAttendanceTable, "Institute Attendance table");
  await safe(ensureEventTableExists, "Institute Event table");
  await safe(ensureInstituteProfileTableExists, "Institute Profile table");
  await safe(ensureReportsTableExists, "Institute Reports table");

  // USER TABLES
  await safe(ensureUsersIDsTableExists, "User IDs table");
  await safe(ensureu_UserTableExists, "User Dashboard table");
  await safe(ensureProfileTableExists, "User Profile table");
  await safe(ensureMembershipTableExists, "User Membership table");
  await safe(ensureImmersionTableExists, "User Immersion table");
  await safe(ensureMOUTableExists, "User MOU table");
  await safe(ensureDonationTableExists, "User Donation table");
  await safe(ensurePlacementTableExists, "User Placement table");
  await safe(ensureResearchTableExists, "User Research table");

  console.log("🎉 Server startup completed successfully");
});

// ---------------------- ROUTES -------------------------
app.use("/api/admin", adminRoutes);
app.use("/api/admin/institutes", aInstitutesRoutes);
app.use("/api/admin/financials", aFinancialsRoutes);
app.use("/api/admin/settings", aSettingsRoutes);
app.use("/api/admin/users", aUsersRoutes);
app.use("/api/admin/notifications", aNotificationsRoutes);
app.use("/api/admin/reports", aReportsRoutes);
app.use("/api/admin/dashboard", aDashboardRoutes);
app.use("/api/admin/courses", aCoursesRoutes);

app.use("/api/institute/departments", departmentRoutes);
app.use("/api/institute/students", studentRoutes);
app.use("/api/institute/faculty", facultyRoutes);
app.use("/api/institute/courses", courseRoute);
app.use("/api/institute/attendance", attendanceRoutes);
app.use("/api/institute/events", eventRoutes);
app.use("/api/institute/profile", profileRoutes);
app.use("/api/institute/notifications", notificationRoutes);
app.use("/api/institute/reports", reportRoutes);
app.use("/api/institute/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);
app.use("/api/user/profile", UprofileRoutes);
app.use("/api/user/membership", membershipRoutes);
app.use("/api/user/immersion", immersionRoutes);
app.use("/api/user/mou", mouRoutes);
app.use("/api/user/donation", donationRoutes);
app.use("/api/user/placement", placementRoutes);
app.use("/api/user/research", researchRoutes);
