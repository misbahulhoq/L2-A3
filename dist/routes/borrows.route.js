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
const borrow_1 = __importDefault(require("../models/borrow"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const book_1 = __importDefault(require("../models/book"));
const borrowsRouter = express_1.default.Router();
borrowsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = (yield book_1.default.findById(bookId));
    if ((book === null || book === void 0 ? void 0 : book.getAvailableCopies()) < quantity) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: "Not enough copies available",
            data: null,
        });
        return;
    }
    book.copies -= quantity;
    yield book.save();
    const borrow = new borrow_1.default({
        book: bookId,
        quantity,
        dueDate,
    });
    yield borrow.save();
    res.send({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
}));
borrowsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrows = yield borrow_1.default.aggregate([
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
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: borrows,
    });
}));
exports.default = borrowsRouter;
