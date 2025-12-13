import {
  createMembership,
  getMemberships,
  findMembershipById,
  updateMembership,
  deleteMembership
} from "../../models/user/Membership.js";
// import db from "../../config/db.js"; // For explicit SQL join

// GET: all memberships (with user info)
export const getMembershipsHandler = (req, res) => {
  // SQL JOIN to get membership, user name, user email
  const sql = `
    SELECT m.*, u.name, u.email
    FROM UserMembership m
    JOIN User u ON m.userId = u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add membership
export const createMembershipHandler = (req, res) => {
  createMembership(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: membership by ID (with user info)
export const getMembershipByIdHandler = (req, res) => {
  const sql = `
    SELECT m.*, u.name, u.email
    FROM UserMembership m
    JOIN User u ON m.userId = u.id
    WHERE m.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Membership not found" });
    res.json(results[0]);
  });
};

// PUT: update membership
export const updateMembershipHandler = (req, res) => {
  updateMembership(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Membership not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove membership
export const deleteMembershipHandler = (req, res) => {
  deleteMembership(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Membership not found" });
    res.json({ message: "Membership deleted" });
  });
};
