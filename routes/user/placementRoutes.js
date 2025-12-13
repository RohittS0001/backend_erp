import express from "express";
import {
  getPlacementsHandler,
  createPlacementHandler,
  getPlacementByIdHandler,
  updatePlacementHandler,
  deletePlacementHandler
} from "../../controllers/user/placementController.js";

const router = express.Router();

router.get("/", getPlacementsHandler);
router.post("/", createPlacementHandler);

router.get("/:id", getPlacementByIdHandler);
router.put("/:id", updatePlacementHandler);
router.delete("/:id", deletePlacementHandler);

export default router;
