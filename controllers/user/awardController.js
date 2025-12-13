import {
  createAward,
  getAwards,
  findAwardById,
  updateAward,
  deleteAward
} from "../../models/user/Award.js";

// GET: all awards
export const getAwardsHandler = (req, res) => {
  getAwards((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add award
export const createAwardHandler = (req, res) => {
  createAward(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: award by ID
export const getAwardByIdHandler = (req, res) => {
  findAwardById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Award not found" });
    res.json(results[0]);
  });
};

// PUT: update award
export const updateAwardHandler = (req, res) => {
  updateAward(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Award not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove award
export const deleteAwardHandler = (req, res) => {
  deleteAward(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Award not found" });
    res.json({ message: "Award deleted" });
  });
};
