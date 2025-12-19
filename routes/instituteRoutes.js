// routes/instituteRoutes.js
import express from "express";
import {
  registerInstituteHandler,
  getInstitutesHandler,
  loginInstituteHandler
} from "../controllers/instituteController.js";

const router = express.Router();

router.post("/register", registerInstituteHandler);
router.get("/", getInstitutesHandler);
router.post("/login", loginInstituteHandler);

export default router;
