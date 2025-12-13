import express from "express";
import {
  getImmersionsHandler,
  createImmersionHandler,
  getImmersionByIdHandler,
  updateImmersionHandler,
  deleteImmersionHandler
} from "../../controllers/user/immersionController.js";

const router = express.Router();

router.get("/", getImmersionsHandler);
router.post("/", createImmersionHandler);

router.get("/:id", getImmersionByIdHandler);
router.put("/:id", updateImmersionHandler);
router.delete("/:id", deleteImmersionHandler);

export default router;
