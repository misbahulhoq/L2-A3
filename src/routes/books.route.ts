import e from "express";
import Book from "../models/book";

const booksRouter = e.Router();

booksRouter.post("/", async (req, res) => {
  const { title, author, genre, isbn, description, copies } = req.body;
  const book = new Book({
    title,
    author,
    genre,
    isbn,
    description,
    copies,
  });
  await book.save();
  res.status(201).send(book);
});

export default booksRouter;
