import express from "express";
import { addFaculty, getFaculty } from "../../controllers/institute/facultyController.js";

const router = express.Router();

router.post("/add", addFaculty);
router.get("/all", getFaculty);

export default router;
