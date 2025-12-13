import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Profile from "../models/Profile.js";

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

// Get Institute Profile
export const getInstituteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Institute Profile
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
