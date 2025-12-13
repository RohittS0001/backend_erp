// import db from "../../config/db.js"; 
import {
  createProfile,
  getProfiles,
  findProfileById,
  updateProfile,
  deleteProfile
} from "../../models/user/Profile.js";

// GET: all profiles with user info
export const getProfilesHandler = (req, res) => {
  const sql = `
    SELECT p.*, u.name, u.email
    FROM UserProfile p
    JOIN User u ON p.userId = u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    // Deserialize skills (array) for each profile
    results = results.map(r => ({
      ...r,
      skills: JSON.parse(r.skills || "[]"),
      contact: { email: r.email, phone: r.phone }
    }));
    res.json(results);
  });
};

// POST: create profile
export const createProfileHandler = (req, res) => {
  createProfile(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: profile by ID with user info
export const getProfileByIdHandler = (req, res) => {
  const sql = `
    SELECT p.*, u.name, u.email
    FROM UserProfile p
    JOIN User u ON p.userId = u.id
    WHERE p.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Profile not found" });
    const profile = results[0];
    profile.skills = JSON.parse(profile.skills || "[]");
    profile.contact = { email: profile.email, phone: profile.phone };
    res.json(profile);
  });
};

// PUT: update profile
export const updateProfileHandler = (req, res) => {
  updateProfile(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: delete profile
export const deleteProfileHandler = (req, res) => {
  deleteProfile(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  });
};
