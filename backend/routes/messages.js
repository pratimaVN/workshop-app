import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Message.find();
  res.json(data);
});

export default router;
