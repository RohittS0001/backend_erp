// controllers/instituteController.js
import {
  createInstitute,
  getAllInstitutes,
  getInstituteByEmail
} from "../models/institutemodels.js";

// Register new institute
export const registerInstituteHandler = async (req, res) => {
  try {
    const institute = await createInstitute(req.body);
    res.status(201).json(institute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all institutes
export const getInstitutesHandler = async (req, res) => {
  try {
    const institutes = await getAllInstitutes();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Institute login
export const loginInstituteHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const institute = await getInstituteByEmail(email);

    console.log("DB:", institute?.email, "|", institute?.password);
    console.log("REQ:", email.toLowerCase().trim(), "|", password.trim());

    if (!institute || institute.password !== password.trim()) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", institute });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
