import express from "express";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import User from "../models/User.js";
import Workshop from "../models/Workshop.js";

const router = express.Router();

// Fetch workshops for the logged in university
router.get("/workshops", protect, permit("university"), async (req, res) => {
  const workshops = await Workshop.find({ university: req.user._id });
  res.json(workshops);
});

// Create workshop
router.post("/workshop", protect, permit("university"), async (req, res) => {
  const workshop = await Workshop.create({
    title: req.body.title,
    university: req.user._id,
  });

  res.json(workshop);
});

// Fetch students belonging to this university (pending only)
router.get("/students", protect, permit("university"), async (req, res) => {
  console.log("REQ.USER =", req.user); 
  const students = await User.find({
    role: "student",
    universityId: req.user.universityId,
    approved: false
  });

  res.json(students);
});

// Approve student
router.post("/approve-student/:id", protect, permit("university"), async (req, res) => {
  const student = await User.findById(req.params.id);

  if (!student) return res.status(404).json({ message: "Student not found" });

  student.approved = true;
  await student.save();

  res.json({ message: "Student approved successfully" });
});

export default router;
