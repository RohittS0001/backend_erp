import InstituteRecord from "../models/instituteModel.js";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Profile from "../models/Profile.js";

// ======================================================
// 📌 1. Register a New Institute
// ======================================================
export const registerInstitute = async (req, res) => {
  try {
    const institute = await InstituteRecord.create(req.body);
    res.status(201).json({ success: true, institute });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 2. Login Institute
// ======================================================
export const loginInstitute = async (req, res) => {
  const { email, password } = req.body;

  try {
    const institute = await InstituteRecord.findOne({
      where: { email }
    });

    if (!institute || institute.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful", institute });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 3. Get All Institutes
// ======================================================
export const getInstitutes = async (req, res) => {
  try {
    const institutes = await InstituteRecord.findAll();
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 4. Institute Dashboard Summary
// ======================================================
export const getInstituteDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.count();
    const totalFaculty = await Faculty.count();
    const totalCourses = await Course.count();
    const totalDepartments = await Department.count();

    res.json({
      success: true,
      dashboard: {
        totalStudents,
        totalFaculty,
        totalCourses,
        totalDepartments
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 5. Get Institute Profile (Single Record)
// ======================================================
export const getInstituteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// 📌 6. Update Institute Profile
// ======================================================
export const updateInstituteProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      await profile.update(req.body);
    }

    res.json({ success: true, profile });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
