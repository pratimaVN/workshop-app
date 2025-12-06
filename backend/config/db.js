import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://pratimanagannavar_db_user:Pratima16@cluster0.mzc5ijj.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "RESERVATIONS",
      }
    )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("DB Connection Error:", err);
    });
};
