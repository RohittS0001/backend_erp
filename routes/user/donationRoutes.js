import express from "express";
import {
  getDonationsHandler,
  createDonationHandler,
  getDonationByIdHandler,
  updateDonationHandler,
  deleteDonationHandler
} from "../../controllers/user/donationController.js";

const router = express.Router();

router.get("/", getDonationsHandler);
router.post("/", createDonationHandler);

router.get("/:id", getDonationByIdHandler);
router.put("/:id", updateDonationHandler);
router.delete("/:id", deleteDonationHandler);

export default router;
