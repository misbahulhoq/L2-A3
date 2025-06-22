"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("../models/book"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const booksRouter = express_1.default.Router();
// post a book
booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, isbn, description, copies } = req.body;
    const book = new book_1.default({
        title,
        author,
        genre,
        isbn,
        description,
        copies,
    });
    const response = yield book.save();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Book created successfully",
        data: response,
    });
}));
// get all books / filtered books
booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit = 10 } = req.query;
    const filterConditions = {};
    const sortConditions = {};
    const limitNum = parseInt(limit);
    if (filter)
        filterConditions.genre = filter;
    if (sortBy)
        sortConditions[sortBy] = sort === "asc" ? 1 : -1;
    console.log(filterConditions);
    const response = yield book_1.default.find(filterConditions)
        .sort(sortConditions)
        .limit(limitNum);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Books retrieved successfully",
        data: response,
    });
}));
// get a book
booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const response = yield book_1.default.findById(bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Book retrieved successfully",
        data: response,
    });
}));
// update a book
booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const { title, author, genre, isbn, description, copies } = req.body;
    const response = yield book_1.default.findByIdAndUpdate(bookId, {
        title,
        author,
        genre,
        isbn,
        description,
        copies,
    }, { new: true });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Book updated successfully",
        data: response,
    });
}));
// delete a book
booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    yield book_1.default.findByIdAndDelete(bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
exports.default = booksRouter;
