
import User from "../models/User.js";
import University from "../models/University.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const tokenGen = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
    const { name, email, password, role, universityName } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });

    if (role === "university") {
        const uni = await University.create({ name: universityName, createdBy: user._id });
        user.university = uni._id;
    }

    await user.save();
    const token = tokenGen(user._id);
    res.json({ token, user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Invalid Email" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return res.json({ message: "Invalid Password" });

    const token = tokenGen(user._id);
    res.json({ token, user });
};
