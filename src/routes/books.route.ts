import e from "express";
import Book from "../models/book";
import sendResponse from "../utils/sendResponse";

const booksRouter = e.Router();

// post a book
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
  const response = await book.save();
  sendResponse(res, {
    success: true,
    message: "Book created successfully",
    data: response,
  });
});

// get all books / filtered books
booksRouter.get("/", async (req, res) => {
  const { filter, sortBy, sort, limit = 10 } = req.query;
  const filterConditions: any = {};
  const sortConditions: any = {};
  const limitNum = parseInt(limit as string);

  if (filter) filterConditions.genre = filter;
  if (sortBy) sortConditions[sortBy as string] = sort === "asc" ? 1 : -1;
  console.log(filterConditions);
  const response = await Book.find(filterConditions)
    .sort(sortConditions)
    .limit(limitNum);

  sendResponse(res, {
    success: true,
    message: "Books retrieved successfully",
    data: response,
  });
});

// get a book
booksRouter.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const response = await Book.findById(bookId);
  sendResponse(res, {
    success: true,
    message: "Book retrieved successfully",
    data: response,
  });
});

// update a book
booksRouter.put("/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const { title, author, genre, isbn, description, copies } = req.body;
  const response = await Book.findByIdAndUpdate(
    bookId,
    {
      title,
      author,
      genre,
      isbn,
      description,
      copies,
    },
    { new: true }
  );
  sendResponse(res, {
    success: true,
    message: "Book updated successfully",
    data: response,
  });
});

// delete a book
booksRouter.delete("/:bookId", async (req, res) => {
  const { bookId } = req.params;
  await Book.findByIdAndDelete(bookId);
  sendResponse(res, {
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});

export default booksRouter;
