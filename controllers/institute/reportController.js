import {
  getReports,
  addReport,
  updateReport,
  deleteReport,
  countReports
} from "../../models/institute/Report.js";

// GET all reports
export const fetchReports = async (req, res) => {
  try {
    const reports = await getReports();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE report
export const createReport = async (req, res) => {
  try {
    const id = await addReport(req.body);
    res.json({ success: true, message: "Report created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE report
export const editReport = async (req, res) => {
  try {
    await updateReport(req.params.id, req.body);
    res.json({ success: true, message: "Report updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE report
export const removeReport = async (req, res) => {
  try {
    await deleteReport(req.params.id);
    res.json({ success: true, message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
