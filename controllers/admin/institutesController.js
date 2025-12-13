import {
  getAllInstitutes,
  createInstitute,
  updateInstituteById,
  deleteInstituteById
} from "../../models/admin/Institute.js";

// Get all institutes
export const getAllInstitutesHandler = async (req, res) => {
  try {
    const institutes = await getAllInstitutes();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching institutes" });
  }
};

// Create a new institute
export const createInstituteHandler = async (req, res) => {
  try {
    const saved = await createInstitute(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add institute" });
  }
};

// Update an institute by ID
export const updateInstituteHandler = async (req, res) => {
  try {
    const updated = await updateInstituteById(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Institute not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update institute" });
  }
};

// Delete an institute by ID
export const deleteInstituteHandler = async (req, res) => {
  try {
    const deleted = await deleteInstituteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Institute not found" });
    }
    res.json({ message: "Institute deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete institute" });
  }
};
