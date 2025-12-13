import express from "express";
import {
  getAwardsHandler,
  createAwardHandler,
  getAwardByIdHandler,
  updateAwardHandler,
  deleteAwardHandler
} from "../../controllers/user/awardController.js";

const router = express.Router();

router.get("/", getAwardsHandler);
router.post("/", createAwardHandler);

router.get("/:id", getAwardByIdHandler);
router.put("/:id", updateAwardHandler);
router.delete("/:id", deleteAwardHandler);

export default router;
