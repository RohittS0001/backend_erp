import {
  createResearch,
  getResearch,
  findResearchById,
  updateResearch,
  deleteResearch
} from "../../models/user/Research.js";

// GET: all researches
export const getResearchesHandler = (req, res) => {
  getResearch((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add research
export const createResearchHandler = (req, res) => {
  createResearch(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: research by ID
export const getResearchByIdHandler = (req, res) => {
  findResearchById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Research not found" });
    res.json(results[0]);
  });
};

// PUT: update research
export const updateResearchHandler = (req, res) => {
  updateResearch(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Research not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove research
export const deleteResearchHandler = (req, res) => {
  deleteResearch(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Research not found" });
    res.json({ message: "Research deleted" });
  });
};
