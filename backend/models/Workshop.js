import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  title: String,
  description: String,
  university: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });


export default mongoose.model("Workshop", workshopSchema);
