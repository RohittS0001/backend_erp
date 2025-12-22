import { createUser, getAllUsers, getUserByEmail } from "../models/usermodels.js";

// Register new user  ✅ unchanged logic, just uses extended model
export const registerUserHandler = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users
export const getUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login  ✅ only email + password, returns safe user object
export const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    console.log("DB:", user?.email, "|", user?.password);
    console.log("REQ:", email.toLowerCase().trim(), "|", password.trim());

    if (!user || user.password !== password.trim()) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    res.json({ message: "Login successful", user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
