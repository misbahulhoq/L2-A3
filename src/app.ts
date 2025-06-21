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
  res.send("Hello World!");
});

routes(app);
app.use(errorHandler);

export default app;
