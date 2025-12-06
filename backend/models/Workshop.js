
import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    university: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("Workshop", workshopSchema);
