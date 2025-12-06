
import express from "express";
import { listUniversities, approveUniversity } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";

const router = express.Router();

router.get("/universities", protect, permit("admin"), listUniversities);
router.post("/approve/:id", protect, permit("admin"), approveUniversity);

export default router;
