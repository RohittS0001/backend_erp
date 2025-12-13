// ---------------------- LOAD ENV -----------------------
import dotenv from "dotenv";
dotenv.config();

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

// ---------------------- ADMIN ROUTES -------------------
import adminRoutes from "./routes/adminRoutes.js";
import aCoursesRoutes from "./routes/admin/a_coursesRoutes.js";
import aDashboardRoutes from "./routes/admin/a_dashboardRoutes.js";
import aFinancialsRoutes from "./routes/admin/a_financialsRoutes.js";
import aInstitutesRoutes from "./routes/admin/a_institutesRoutes.js";
import aNotificationsRoutes from "./routes/admin/a_notificationsRoutes.js";
import aReportsRoutes from "./routes/admin/a_reportsRoutes.js";
import aSettingsRoutes from "./routes/admin/a_settingsRoutes.js";
import aUsersRoutes from "./routes/admin/a_usersRoutes.js";

// ---------------------- USER TABLES --------------------
import { ensureu_UserTableExists } from "./models/user/UserDashboard.js";
import { ensureUsersIDsTableExists } from "./models/usermodels.js";
import { ensureProfileTableExists } from "./models/user/profile.js";
import { ensureMembershipTableExists } from "./models/user/Membership.js";
import { ensureImmersionTableExists } from "./models/user/Immersion.js";
import { ensureMOUTableExists } from "./models/user/MOU.js";
import { ensureDonationTableExists } from "./models/user/Donation.js";
import { ensurePlacementTableExists } from "./models/user/Placement.js";
import { ensureResearchTableExists } from "./models/user/Research.js";

// ---------------------- USER ROUTES --------------------
import userRoutes from "./routes/userRoutes.js";
import UprofileRoutes from "./routes/user/U_profileRoutes.js";
import membershipRoutes from "./routes/user/membershipRoutes.js";
import immersionRoutes from "./routes/user/immersionRoutes.js";
import mouRoutes from "./routes/user/mouRoutes.js";
import donationRoutes from "./routes/user/donationRoutes.js";
import placementRoutes from "./routes/user/placementRoutes.js";
import researchRoutes from "./routes/user/researchRoutes.js";

// ---------------------- INSTITUTE TABLES ----------------
import { ensureDepartmentTableExists } from "./models/institute/department.js";
import { ensureStudentTableExists } from "./models/institute/Student.js";
import { ensureFacultyTableExists } from "./models/institute/Faculty.js";
import { ensureCourseTableExists as ensureInstituteCourseTable } from "./models/institute/Course.js";
import { ensureAttendanceTable } from "./models/institute/Attendance.js";
import { ensureEventTableExists } from "./models/institute/Event.js";
import { ensureProfileTableExists as ensureInstituteProfileTableExists } from "./models/institute/profile.js";
import { ensureReportsTableExists } from "./models/institute/Report.js";

// ---------------------- INSTITUTE ROUTES ----------------
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
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ---------------------- HEALTH CHECK --------------------
app.get("/", (_req, res) => {
  res.send("INSTITUTE ERP – MySQL Backend Running ✅");
});

// ---------------------- START SERVER --------------------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await connectDB();
    console.log("✅ MySQL connected");

    // ---------- ADMIN TABLES ----------
    await ensureCourseTableExists();
    await ensureFinancialTableExists();
    await ensureInstituteTableExists();
    await ensureNotificationTableExists();
    await ensureReportTableExists();
    await ensureSettingTableExists();
    await ensureUserTableExists();
    await ensureAdminTableExists();

    // ---------- INSTITUTE TABLES ----------
    await ensureDepartmentTableExists();
    await ensureStudentTableExists();
    await ensureFacultyTableExists();
    await ensureInstituteCourseTable();
    await ensureAttendanceTable();
    await ensureEventTableExists();
    await ensureInstituteProfileTableExists();
    await ensureReportsTableExists();

    // ---------- USER TABLES ----------
    await ensureUsersIDsTableExists();
    await ensureu_UserTableExists();
    await ensureProfileTableExists();
    await ensureMembershipTableExists();
    await ensureImmersionTableExists();
    await ensureMOUTableExists();
    await ensureDonationTableExists();
    await ensurePlacementTableExists();
    await ensureResearchTableExists();

    console.log("✅ All ERP tables verified/created successfully!");
  } catch (err) {
    console.error("❌ Startup error:", err.message);
  }
});

// ---------------------- ADMIN ROUTES --------------------
app.use("/api/admin", adminRoutes);
app.use("/api/admin/institutes", aInstitutesRoutes);
app.use("/api/admin/financials", aFinancialsRoutes);
app.use("/api/admin/settings", aSettingsRoutes);
app.use("/api/admin/users", aUsersRoutes);
app.use("/api/admin/notifications", aNotificationsRoutes);
app.use("/api/admin/reports", aReportsRoutes);
app.use("/api/admin/dashboard", aDashboardRoutes);
app.use("/api/admin/courses", aCoursesRoutes);

// ---------------------- INSTITUTE ROUTES ----------------
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

// ---------------------- USER ROUTES ---------------------
app.use("/api/users", userRoutes);
app.use("/api/user/profile", UprofileRoutes);
app.use("/api/user/membership", membershipRoutes);
app.use("/api/user/immersion", immersionRoutes);
app.use("/api/user/mou", mouRoutes);
app.use("/api/user/donation", donationRoutes);
app.use("/api/user/placement", placementRoutes);
app.use("/api/user/research", researchRoutes);
