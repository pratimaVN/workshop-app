
import express from "express";
import { listAvailable, registerWorkshop } from "../controllers/studentController.js";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";

const router = express.Router();

router.get("/workshops", protect, permit("student"), listAvailable);
router.post("/register/:id", protect, permit("student"), registerWorkshop);

export default router;
