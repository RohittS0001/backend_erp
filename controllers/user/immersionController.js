import {
  createImmersion,
  getImmersions,
  findImmersionById,
  updateImmersion,
  deleteImmersion
} from "../../models/user/Immersion.js";

// GET: all immersion records
export const getImmersionsHandler = (req, res) => {
  getImmersions((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add immersion record
export const createImmersionHandler = (req, res) => {
  createImmersion(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: immersion by ID
export const getImmersionByIdHandler = (req, res) => {
  findImmersionById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Immersion not found" });
    res.json(results[0]);
  });
};

// PUT: update immersion
export const updateImmersionHandler = (req, res) => {
  updateImmersion(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Immersion not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove immersion
export const deleteImmersionHandler = (req, res) => {
  deleteImmersion(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Immersion not found" });
    res.json({ message: "Immersion deleted" });
  });
};
