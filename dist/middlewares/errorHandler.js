"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorPayload = {
        name: err.name,
        message: err.message,
        errors: err.errors,
    };
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation Error";
        errorPayload = {
            name: err.name,
            errors: err.errors,
        };
    }
    res.status(statusCode).json({ message, success: false, error: errorPayload });
};
exports.errorHandler = errorHandler;
exports.default = errorHandler;
