import {
  createInstitute,
  getAllInstitutes,
  getInstituteById,
  updateInstituteById,
  deleteInstituteById
} from "../models/institutemodels.js";

// GET all institutes
export const getInstitutesHandler = async (req, res) => {
  try {
    const institutes = await getAllInstitutes();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET institute by ID
export const getInstituteHandler = async (req, res) => {
  try {
    const institute = await getInstituteById(req.params.id);
    if (!institute) return res.status(404).json({ error: "Institute not found" });
    res.json(institute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new institute
export const createInstituteHandler = async (req, res) => {
  try {
    const institute = await createInstitute(req.body);
    res.status(201).json(institute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE institute by ID
export const updateInstituteHandler = async (req, res) => {
  try {
    const institute = await updateInstituteById(req.params.id, req.body);
    if (!institute) return res.status(404).json({ error: "Institute not found" });
    res.json(institute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE institute by ID
export const deleteInstituteHandler = async (req, res) => {
  try {
    const success = await deleteInstituteById(req.params.id);
    if (!success) return res.status(404).json({ error: "Institute not found" });
    res.json({ message: "Institute deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
