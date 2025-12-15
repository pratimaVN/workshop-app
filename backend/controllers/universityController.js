import Workshop from "../models/Workshop.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { studentApprovalTemplate } from "../utils/emailTemplates.js";
import Notification from "../models/Notification.js";


/* ================= WORKSHOPS ================= */


// ✔ Create workshop
export const createWorkshop = async (req, res) => {
  const workshop = await Workshop.create({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    university: req.user.universityId
  });

  res.json(workshop);
};

// ✔ Get all workshops
export const listWorkshops = async (req, res) => {
  const workshops = await Workshop.find({
    university: req.user.universityId
  });
  res.json(workshops);
};

// ✔ Edit workshop
export const editWorkshop = async (req, res) => {
  const workshop = await Workshop.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!workshop) {
    return res.status(404).json({ message: "Workshop not found" });
  }

  res.json(workshop);
};

// ✔ Delete workshop
export const deleteWorkshop = async (req, res) => {
  await Workshop.findByIdAndDelete(req.params.id);
  res.json({ message: "Workshop deleted" });
};

/* ================= STUDENTS ================= */

// ✔ View students of this university
export const listStudents = async (req, res) => {
  const students = await User.find({
    role: "student",
    universityId: req.user.universityId
  });

  res.json(students);
};
// ✔ Approve student
export const approveStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.approved = true;
    await student.save();

    // 📧 Email
    await sendEmail({
      to: student.email,
      subject: "Student Approved ✔",
      html: studentApprovalTemplate(student.name, "approved")
    });

    res.json({ message: "Student approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✔ Reject student
export const rejectStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 📧 Email BEFORE delete
    await sendEmail({
      to: student.email,
      subject: "Student Rejected ❌",
      html: studentApprovalTemplate(student.name, "rejected")
    });

    await student.deleteOne();

    res.json({ message: "Student rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= PARTICIPANTS ================= */

// ✔ View workshop participants
export const workshopParticipants = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id)
    .populate("participants", "name email");

  res.json(workshop.participants);
};
