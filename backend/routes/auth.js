import express from "express";
import { signup, login } from "../controllers/authController.js";
import University from "../models/University.js";
import User from "../models/User.js"; // ✅ ADD THIS LINE

const router = express.Router();

// Public universities list for students
router.get("/universities-public", async (req, res) => {
  try {
    const universities = await University.find({ status: "approved" });
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: "Error fetching universities" });
  }
});

// ✅ Email existence check
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
});

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
