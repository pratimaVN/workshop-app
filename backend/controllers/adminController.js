import University from "../models/University.js";
import User from "../models/User.js";
import Workshop from "../models/Workshop.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";
import { universityApprovalTemplate } from "../utils/emailTemplates.js";

/* =========================
   GET ALL UNIVERSITIES
========================= */
export const listUniversities = async (req, res) => {
  const data = await University.find().populate(
    "createdBy",
    "name email"
  );
  res.json(data);
};

/* =========================
   APPROVE UNIVERSITY
========================= */
export const approveUniversity = async (req, res) => {
  const uni = await University.findById(req.params.id).populate("createdBy");
  if (!uni) return res.status(404).json({ message: "University not found" });

  uni.status = "approved";
  await uni.save();

  await User.findByIdAndUpdate(uni.createdBy._id, { approved: true });

  // 📧 Email
  await sendEmail({
    to: uni.createdBy.email,
    subject: "University Approved ✔",
    html: universityApprovalTemplate(uni.name, "approved")
  });

  res.json({ message: "University Approved", university: uni });
};



/* =========================
   REJECT UNIVERSITY
========================= */
export const rejectUniversity = async (req, res) => {
  const uni = await University.findById(req.params.id).populate("createdBy");
  if (!uni) return res.status(404).json({ message: "University not found" });

  uni.status = "rejected";
  await uni.save();

  await User.findByIdAndUpdate(uni.createdBy._id, { status: "rejected" });

  await sendEmail({
    to: uni.createdBy.email,
    subject: "University Rejected ✔",
    html: universityApprovalTemplate(uni.name, "rejected")
  });

  res.json({ message: "University Rejected", university: uni });
};

/* =========================
   GET ALL STUDENTS
========================= */
export const getAllStudents = async (req, res) => {
  const students = await User.find({ role: "student" })
    .populate("universityId", "name status");
  res.json(students);
};

/* =========================
   GET ALL WORKSHOPS
========================= */
export const getAllWorkshops = async (req, res) => {
  const workshops = await Workshop.find()
    .populate("university", "name")
    .populate("participants", "name email");
  res.json(workshops);
};

/* =========================
   ADMIN STATS
========================= */
export const adminStats = async (req, res) => {
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
};
