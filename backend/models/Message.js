import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: String,
  content: String,
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
