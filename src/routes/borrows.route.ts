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

borrowsRouter.get("/", async (req, res) => {
  const borrows = await Borrow.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $unwind: "$book",
    },
    {
      $group: {
        _id: "$book",
        book: { $first: "$book" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);
  sendResponse(res, {
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrows,
  });
});
export default borrowsRouter;
