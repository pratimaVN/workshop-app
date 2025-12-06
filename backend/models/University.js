
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    name: String,
    address: String,
    status: { type: String, default: "pending" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("University", universitySchema);
