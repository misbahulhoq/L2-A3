import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/playground")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default connectDB;
