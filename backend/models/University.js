import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("University", universitySchema);
