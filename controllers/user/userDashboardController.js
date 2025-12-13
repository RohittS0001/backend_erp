// import {
//   getAdmissions
// } from "../../models/user/Admission.js"; // Uncomment and implement model for Admission
import {
  getAwards
} from "../../models/user/Award.js";
import {
  getResearch
} from "../../models/user/Research.js";
import {
  getImmersions
} from "../../models/user/Immersion.js";
import {
  getPlacements
} from "../../models/user/Placement.js";

// Fetch dashboard data for widgets
export const getDashboardDataHandler = (req, res) => {
  // Using callback nesting or Promise wrappers to get counts
  Promise.all([
    new Promise((resolve, reject) => getAdmissions((err, results) => err ? reject(err) : resolve(results))),
    new Promise((resolve, reject) => getAwards((err, results) => err ? reject(err) : resolve(results))),
    new Promise((resolve, reject) => getResearch((err, results) => err ? reject(err) : resolve(results))),
    new Promise((resolve, reject) => getImmersions((err, results) => err ? reject(err) : resolve(results))),
    new Promise((resolve, reject) => getPlacements((err, results) => err ? reject(err) : resolve(results)))
  ]).then(([admissions, awards, researches, immersions, placements]) => {
    res.json({
      admissionsCount: admissions.length,
      awardsCount: awards.length,
      researchesCount: researches.length,
      immersionsPercent: immersions.length > 0 ? 92 : 0,
      placementsCount: placements.length
    });
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
};

// Optionally, recent activity endpoint is unchanged since static data
export const getRecentActivityHandler = (req, res) => {
  res.json([
    { text: "Upcoming Placement Drive", time: "In 1 day" },
    { text: "Membership Expiring Soon", time: "In 2 days" },
    { text: "Attended Research Seminar", time: "Today" },
    { text: "New Notice from Institute", time: "Just now" }
  ]);
};
