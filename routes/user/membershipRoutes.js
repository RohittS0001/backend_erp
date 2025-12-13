import express from "express";
import {
  getMembershipsHandler,
  createMembershipHandler,
  getMembershipByIdHandler,
  updateMembershipHandler,
  deleteMembershipHandler
} from "../../controllers/user/membershipController.js";

const router = express.Router();

router.get("/", getMembershipsHandler);
router.post("/", createMembershipHandler);

router.get("/:id", getMembershipByIdHandler);
router.put("/:id", updateMembershipHandler);
router.delete("/:id", deleteMembershipHandler);

export default router;
