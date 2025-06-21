import { Express } from "express";
import booksRouter from "./books.route";
import borrowsRouter from "./borrows.route";
export default function routes(app: Express) {
  app.use("/api/books", booksRouter);
  app.use("/api/borrow", borrowsRouter);
}
