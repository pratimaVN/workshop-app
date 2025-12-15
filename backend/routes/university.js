import express from "express";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import User from "../models/User.js";
import Workshop from "../models/Workshop.js";
import { approveStudent,  rejectStudent} from "../controllers/universityController.js";


const router = express.Router();

/* ================= WORKSHOPS ================= */

// GET workshops
router.get("/workshops", protect, permit("university"), async (req, res) => {
  const workshops = await Workshop.find({
    university: req.user.universityId   // ✅ FIXED
  }).sort({ createdAt: -1 });

  res.json(workshops);
});

// CREATE workshop
router.post("/workshop", protect, permit("university"), async (req, res) => {
  const workshop = await Workshop.create({
    title: req.body.title,
    university: req.user.universityId   // ✅ FIXED
  });

  res.json(workshop);
});

// DELETE workshop (IMPORTANT FIX)
router.delete(
  "/workshop/:id",
  protect,
  permit("university"),
  async (req, res) => {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    await workshop.deleteOne();
    res.json({ message: "Workshop deleted" });
  }
);


/* ================= STUDENTS ================= */

// GET pending students
// GET pending students
router.get("/students", protect, permit("university"), async (req, res) => {
  const students = await User.find({
    role: "student",
    universityId: req.user.universityId,
    status: "pending"   // ✅ FIX
  });
  res.json(students);
});


// APPROVE student
router.post("/approve-student1/:id", protect, permit("university"), async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  student.approved = true;
  await student.save();

  res.json({ message: "Student approved" });
});

// REJECT student
router.post("/reject-student1/:id", protect, permit("university"), async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  await student.deleteOne();
  res.json({ message: "Student rejected" });
});

router.post("/approve-student/:id", protect, permit("university"), approveStudent);
router.post("/reject-student/:id", protect, permit("university"), rejectStudent);

export default router;
