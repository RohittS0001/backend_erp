import {
  createMOU,
  getMOUs,
  findMOUById,
  updateMOU,
  deleteMOU
} from "../../models/user/MOU.js";

// GET: all MOUs
export const getMOUsHandler = (req, res) => {
  getMOUs((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add MOU
export const createMOUHandler = (req, res) => {
  createMOU(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: MOU by ID
export const getMOUByIdHandler = (req, res) => {
  findMOUById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "MOU not found" });
    res.json(results[0]);
  });
};

// PUT: update MOU
export const updateMOUHandler = (req, res) => {
  updateMOU(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "MOU not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove MOU
export const deleteMOUHandler = (req, res) => {
  deleteMOU(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "MOU not found" });
    res.json({ message: "MOU deleted" });
  });
};
