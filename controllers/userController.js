import { createUser, getAllUsers, getUserByEmail } from "../models/usermodels.js";

// Register new user
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

// User login
export const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    console.log("DB:", user?.email, "|", user?.password);
    console.log("REQ:", email.toLowerCase().trim(), "|", password.trim());

    if (!user || user.password !== password.trim()) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
