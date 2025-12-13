import express from "express";
import {
  getResearchesHandler,
  createResearchHandler,
  getResearchByIdHandler,
  updateResearchHandler,
  deleteResearchHandler
} from "../../controllers/user/researchController.js";

const router = express.Router();

router.get("/", getResearchesHandler);
router.post("/", createResearchHandler);

router.get("/:id", getResearchByIdHandler);
router.put("/:id", updateResearchHandler);
router.delete("/:id", deleteResearchHandler);

export default router;
