import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

export default app;
