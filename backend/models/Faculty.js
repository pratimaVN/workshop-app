import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University"
  }
}, { timestamps: true });

export default mongoose.model("Faculty", facultySchema);
