"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const books_route_1 = __importDefault(require("./books.route"));
const borrows_route_1 = __importDefault(require("./borrows.route"));
function routes(app) {
    app.use("/api/books", books_route_1.default);
    app.use("/api/borrow", borrows_route_1.default);
}
