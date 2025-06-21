import { Express } from "express";
import booksRouter from "./books.route";
export default function routes(app: Express) {
  app.use("/api/books", booksRouter);
}
