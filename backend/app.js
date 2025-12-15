import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import universityRoutes from "./routes/university.js";
import studentRoutes from "./routes/student.js";
import facultyRoutes from "./routes/faculty.js";
import notificationRoutes from "./routes/notifications.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notifications", notificationRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
