
import University from "../models/University.js";
import User from "../models/User.js";

export const listUniversities = async (req, res) => {
    const data = await University.find().populate("createdBy", "name email");
    res.json(data);
};

export const approveUniversity = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);

    if (!uni) {
      return res.status(404).json({ message: "University not found" });
    }

    uni.status = "approved";
    await uni.save(); 

    // Also approve the university user account
    if (uni.createdBy) {
      await User.findByIdAndUpdate(
        uni.createdBy,
        { approved: true },
        { new: true }
      );
    }

    res.json({
      message: "University Approved",
      university: uni
    });

  } catch (error) {
    res.status(500).json({
      message: "Approval failed",
      error: error.message
    });
  }
};

