import Workshop from "../models/Workshop.js";

// ✔ View available workshops (only approved universities)
export const listAvailable = async (req, res) => {
  const workshops = await Workshop.find()
    .populate("university", "name status");

  res.json(workshops.filter(w => w.university?.status === "approved"));
};

// ✔ Register for workshop
export const registerWorkshop = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) return res.status(404).json({ message: "Workshop not found" });

  if (workshop.participants.includes(req.user._id))
    return res.json({ message: "Already enrolled" });

  workshop.participants.push(req.user._id);
  await workshop.save();

  res.json({ message: "Registered Successfully" });
};

// ✔ Cancel workshop registration
export const unregisterWorkshop = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  workshop.participants = workshop.participants.filter(
    p => p.toString() !== req.user._id.toString()
  );
  await workshop.save();

  res.json({ message: "Unregistered" });
};

// ✔ View my registered workshops
export const myWorkshops = async (req, res) => {
  const workshops = await Workshop.find({ participants: req.user._id });
  res.json(workshops);
};
