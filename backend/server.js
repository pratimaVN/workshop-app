import app from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";   // ✅ IMPORT DB CONNECTION

dotenv.config();

// ✅ CONNECT TO DATABASE
dbConnection();

app.listen(process.env.PORT || 5000, () => {
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT || 5000}`);
});
