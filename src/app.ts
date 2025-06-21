import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();

// default middlewares
app.use(express.json());

// connect to database
connectDB();

app.get("/", (_req, res) => {
  res.json({
    status: "success",
    message: "Server is up and running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

routes(app);
app.use(errorHandler);

export default app;
