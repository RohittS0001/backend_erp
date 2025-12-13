import {
  createAdmin,
  getAllAdmins,
  getAdminByEmail
} from "../models/adminmodels.js";

// Register new admin
export const registerAdminHandler = async (req, res) => {
  try {
    const admin = await createAdmin(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all admins
export const getAdminsHandler = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin login
export const loginAdminHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await getAdminByEmail(email);
    
    console.log("DB:", admin?.email, "|", admin?.password);
    console.log("REQ:", email.toLowerCase().trim(), "|", password.trim());
    
    if (!admin || admin.password !== password.trim()) {
      return res.status(401).json({ error: "Invalid credentials" });
  }

    res.json({ message: "Login successful", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
