import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "university", "student"] },
  approved: { type: Boolean, default: false },

  universityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "University" 
  }
});

export default mongoose.model("User", userSchema);
