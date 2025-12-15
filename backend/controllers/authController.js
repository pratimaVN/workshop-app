import User from "../models/User.js";
import University from "../models/University.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Notification from "../models/Notification.js";

const tokenGen = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });


// ✅ SIGNUP EXPORT
// inside authController.js

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, universityName, universityId } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      status: "pending"
    });

    if (role === "university") {
      const uni = await University.create({
        name: universityName,
        createdBy: user._id
      });

      user.universityId = uni._id;
      await user.save();

      // 🔔 Notify ALL admins
      const admins = await User.find({ role: "admin" });
      for (const admin of admins) {
        await Notification.create({
          user: admin._id,
          title: "New University Request",
          message: `${universityName} registered and is pending approval`
        });
      }
    }

    if (role === "student") {
      user.universityId = universityId;
      await user.save();
    }

    const token = tokenGen(user._id);
    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// ✅ LOGIN EXPORT — THIS IS WHAT WAS MISSING
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Invalid Email" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return res.json({ message: "Invalid Password" });

    const token = tokenGen(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
