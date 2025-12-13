import express from "express";
import {
  addEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from "../../controllers/institute/eventController.js";

const router = express.Router();

router.post("/add", addEvent);
router.get("/all", getEvents);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
