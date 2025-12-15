import express from "express";
import { listUniversities, approveUniversity } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import User from "../models/User.js";
import University from "../models/University.js";
import Workshop from "../models/Workshop.js";
import { rejectUniversity } from "../controllers/adminController.js";



const router = express.Router();

/* UNIVERSITIES */
router.get("/universities", protect, permit("admin"), listUniversities);
router.post("/approve/:id", protect, permit("admin"), approveUniversity);
router.post("/reject/:id", protect, permit("admin"), rejectUniversity);


/* DASHBOARD STATS */
router.get("/stats", protect, permit("admin"), async (req, res) => {
  const totalUniversities = await University.countDocuments({ status: "approved" });
  const pendingApprovals = await University.countDocuments({ status: "pending" });
  const totalWorkshops = await Workshop.countDocuments();

  res.json({ totalUniversities, pendingApprovals, totalWorkshops });
});

/* PERFORMANCE */
router.get("/performance", protect, permit("admin"), async (req, res) => {
  const totalUniversities = await University.countDocuments();
  const approvedUniversities = await University.countDocuments({ status: "approved" });
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalWorkshops = await Workshop.countDocuments();

  res.json({
    totalUniversities,
    approvedUniversities,
    totalStudents,
    totalWorkshops
  });
});
router.get("/stats", async (req, res) => {
  res.json({
    totalWorkshops: 0
  });
});


export default router;
