import express from "express";
import {
  getInstitutesHandler,
  getInstituteHandler,
  createInstituteHandler,
  updateInstituteHandler,
  deleteInstituteHandler
} from "../controllers/instituteController.js";

const router = express.Router();

// CRUD routes for institutes
router.get("/", getInstitutesHandler);
router.get("/:id", getInstituteHandler);
router.post("/", createInstituteHandler);
router.put("/:id", updateInstituteHandler);
router.delete("/:id", deleteInstituteHandler);

export default router;
