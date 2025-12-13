import express from "express";
import {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from "../../controllers/institute/courseController.js";

const router = express.Router();

router.post("/add", addCourse);
router.get("/all", getCourses);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);

export default router;
