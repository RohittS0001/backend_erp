import express from "express";
import {
  getAllInstitutesHandler,
  createInstituteHandler,
  updateInstituteHandler,
  deleteInstituteHandler,
} from "../../controllers/admin/institutesController.js";

const router = express.Router();

router.get("/", getAllInstitutesHandler);          // List all institutes
router.post("/", createInstituteHandler);          // Add new institute
router.put("/:id", updateInstituteHandler);        // Update institute by ID
router.delete("/:id", deleteInstituteHandler);     // Delete institute by ID

export default router;
