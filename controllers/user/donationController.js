import {
  createDonation,
  getDonations,
  findDonationById,
  updateDonation,
  deleteDonation
} from "../../models/user/Donation.js";

// GET: all donations
export const getDonationsHandler = (req, res) => {
  getDonations((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add donation
export const createDonationHandler = (req, res) => {
  createDonation(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: donation by ID
export const getDonationByIdHandler = (req, res) => {
  findDonationById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Donation not found" });
    res.json(results[0]);
  });
};

// PUT: update donation
export const updateDonationHandler = (req, res) => {
  updateDonation(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Donation not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove donation
export const deleteDonationHandler = (req, res) => {
  deleteDonation(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Donation not found" });
    res.json({ message: "Donation deleted" });
  });
};
