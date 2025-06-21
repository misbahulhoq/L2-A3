import e from "express";
import Borrow from "../models/borrow";
import sendResponse from "../utils/sendResponse";
import Book, { IBook, IBookMethods } from "../models/book";
const borrowsRouter = e.Router();

borrowsRouter.post("/", async (req, res) => {
  const { book: bookId, quantity, dueDate } = req.body;
  const book = (await Book.findById(bookId)) as IBook & IBookMethods;

  if (book?.getAvailableCopies() < quantity) {
    sendResponse(res, {
      success: false,
      message: "Not enough copies available",
      data: null,
    });
    return;
  }
  book.copies -= quantity;
  await book.save();

  const borrow = new Borrow({
    book: bookId,
    quantity,
    dueDate,
  });
  await borrow.save();

  res.send({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
});
export default borrowsRouter;
