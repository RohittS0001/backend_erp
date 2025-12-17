// ---------------- IMPORT MODEL FUNCTIONS ----------------
// ❌ REMOVED Sequelize models
// ✅ USING MySQL model functions instead
import {
  createInstituteRecord,
  findInstituteByEmail
} from "../models/institutemodels.js"; //ksjdkb

import {
  countStudents,
  countFaculty,
  countCourses,
  countDepartments
} from "../models/instituteDashboardModel.js"; 
// 👆 you can keep counts separate (clean architecture)

// ======================================================
// 📌 1. Register Institute
// ======================================================
export const registerInstitute = async (req, res) => {
  try {
    const institute = await createInstituteRecord(req.body);
    res.status(201).json({ success: true, institute });
  } catch (error) {
    // ✅ DUPLICATE EMAIL HANDLING
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 2. Login Institute
// ======================================================
export const loginInstitute = async (req, res) => {
  const { email, password } = req.body;

  try {
    const institute = await findInstituteByEmail(email);

    // ✅ SAME LOGIN LOGIC AS USER & ADMIN
    if (!institute || institute.password !== password.trim()) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      institute: {
        id: institute.id,
        email: institute.email
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 3. Institute Dashboard Summary
// ======================================================
export const getInstituteDashboard = async (_req, res) => {
  try {
    const dashboard = {
      totalStudents: await countStudents(),
      totalFaculty: await countFaculty(),
      totalCourses: await countCourses(),
      totalDepartments: await countDepartments()
    };

    res.json({ success: true, dashboard });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
