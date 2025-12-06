
import Workshop from "../models/Workshop.js";

export const listAvailable = async (req, res) => {
    const data = await Workshop.find({ university: req.user.university });
    res.json(data);
};

export const registerWorkshop = async (req, res) => {
    const workshop = await Workshop.findById(req.params.id);
    workshop.participants.push(req.user._id);
    await workshop.save();
    res.json({ message: "Registered Successfully" });
};
