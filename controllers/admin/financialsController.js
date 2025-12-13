// backend/controllers/admin/financialsController.js
import {
  getAllFinancials,
  getFinancialTotal,
  createFinancialRecord,
  updateFinancialById,
  deleteFinancialById
} from "../../models/admin/Financial.js";

// Get all financial records
export const getAllFinancialsHandler = async (req, res) => {
  try {
    const financials = await getAllFinancials();
    res.json(financials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch financial records" });
  }
};

// Get total financial records sum
export const getFinancialTotalHandler = async (req, res) => {
  try {
    const total = await getFinancialTotal();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch total financials" });
  }
};

// Add a new financial record
export const createFinancialHandler = async (req, res) => {
  try {
    const saved = await createFinancialRecord(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add financial record" });
  }
};

// Update a financial record by ID
export const updateFinancialHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateFinancialById(id, req.body);
    if (!updated) return res.status(404).json({ error: "Financial record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update financial record" });
  }
};

// Delete a financial record by ID
export const deleteFinancialHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteFinancialById(id);
    if (!deleted) return res.status(404).json({ error: "Financial record not found" });
    res.json({ message: "Financial record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete financial record" });
  }
};
