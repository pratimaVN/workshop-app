import express from "express";
import { protect } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import Faculty from "../models/Faculty.js";

const router = express.Router();
router.post("/", protect, permit("admin", "university"), async (req, res) => {
  const faculty = await Faculty.create({
    ...req.body,
    university: req.user.universityId   // ✅ FIX
  });
  res.json(faculty);
});
router.get("/", protect, permit("admin", "university"), async (req, res) => {
  const faculty = await Faculty.find({
    university: req.user.universityId
  });
  res.json(faculty);
});

/* GET faculty */
router.get("/", protect, permit("admin", "university"), async (req, res) => {
  const faculty = await Faculty.find();
  res.json(faculty);
});

/* CREATE faculty */
router.post("/", protect, permit("admin", "university"), async (req, res) => {
  const faculty = await Faculty.create(req.body);
  res.json(faculty);
});

/* DELETE faculty */
router.delete("/:id", protect, permit("admin"), async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: "Faculty deleted" });
});

export default router;
