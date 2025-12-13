import {
  createPlacement,
  getPlacements,
  findPlacementById,
  updatePlacement,
  deletePlacement
} from "../../models/user/Placement.js";

// GET: all placements
export const getPlacementsHandler = (req, res) => {
  getPlacements((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add new placement
export const createPlacementHandler = (req, res) => {
  createPlacement(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: placement by ID
export const getPlacementByIdHandler = (req, res) => {
  findPlacementById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Placement not found" });
    res.json(results[0]);
  });
};

// PUT: update placement
export const updatePlacementHandler = (req, res) => {
  updatePlacement(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Placement not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove placement
export const deletePlacementHandler = (req, res) => {
  deletePlacement(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Placement not found" });
    res.json({ message: "Placement deleted" });
  });
};
