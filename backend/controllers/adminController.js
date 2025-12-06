
import University from "../models/University.js";
import User from "../models/User.js";

export const listUniversities = async (req, res) => {
    const data = await University.find().populate("createdBy", "name email");
    res.json(data);
};

export const approveUniversity = async (req, res) => {
    const uni = await University.findById(req.params.id);
    uni.status = "approved";
    await uni.save();

    await User.findByIdAndUpdate(uni.createdBy, { approved: true });

    res.json({ message: "University Approved" });
};
