import {
  getAllReports,
  createReport
} from "../../models/admin/Report.js";

// Get all reports
export const getAllReportsHandler = async (req, res) => {
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reports" });
  }
};

// Create a new report
export const createReportHandler = async (req, res) => {
  try {
    const saved = await createReport(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add report" });
  }
};
