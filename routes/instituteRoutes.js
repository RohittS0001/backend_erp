// routes/instituteRoutes.js
import express from "express";
import {
  getInstitutesHandler,
  getInstituteHandler,
  createInstituteHandler,
  updateInstituteHandler,
  deleteInstituteHandler,
  loginInstituteHandler
} from "../controllers/instituteController.js";

const router = express.Router();

// LOGIN route for institutes
router.post("/login", loginInstituteHandler);

// CRUD routes for institutes
router.get("/", getInstitutesHandler);
router.get("/:id", getInstituteHandler);
router.post("/", createInstituteHandler);
router.put("/:id", updateInstituteHandler);
router.delete("/:id", deleteInstituteHandler);

export default router;
