import {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById
} from "../../models/admin/User.js";

// Get all users
export const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Create a new user
export const createUserHandler = async (req, res) => {
  try {
    const saved = await createUser(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add user" });
  }
};

// Update user by ID
export const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateUserById(id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user by ID
export const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUserById(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
