import express from "express";
import { signup, login } from "../controllers/authController.js";
import University from "../models/University.js";

const router = express.Router();    // ✅ Router FIRST

// Public universities list for students
router.get("/universities-public", async (req, res) => {
  try {
    const universities = await University.find({ status: "approved" });
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: "Error fetching universities" });
  }
});

router.post("/signup", signup);
router.post("/login", login);

export default router;
