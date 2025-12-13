import express from "express";
import {
  getMOUsHandler,
  createMOUHandler,
  getMOUByIdHandler,
  updateMOUHandler,
  deleteMOUHandler
} from "../../controllers/user/mouController.js";

const router = express.Router();

router.get("/", getMOUsHandler);
router.post("/", createMOUHandler);

router.get("/:id", getMOUByIdHandler);
router.put("/:id", updateMOUHandler);
router.delete("/:id", deleteMOUHandler);

export default router;
