
import Workshop from "../models/Workshop.js";

export const createWorkshop = async (req, res) => {
    const { title, description, date } = req.body;
    const workshop = await Workshop.create({
        title, description, date, university: req.user.university
    });
    res.json(workshop);
};

export const listWorkshops = async (req, res) => {
    const data = await Workshop.find({ university: req.user.university });
    res.json(data);
};
