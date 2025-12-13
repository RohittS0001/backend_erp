import { countStudents } from "../../models/institute/Student.js";
import { countFaculty } from "../../models/institute/Faculty.js";
import { countDepartments } from "../../models/institute/department.js";
import { countCourses } from "../../models/institute/Course.js";
import { countReports } from "../../models/institute/Report.js";
import { countEvents } from "../../models/institute/Event.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await countStudents();
    const totalFaculty = await countFaculty();
    const totalDepartments = await countDepartments();
    const totalCourses = await countCourses();
    const totalReports = await countReports();
    const totalEvents = await countEvents();

    res.json({
      students: totalStudents,
      faculty: totalFaculty,
      departments: totalDepartments,
      courses: totalCourses,
      reports: totalReports,
      events: totalEvents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
