"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/playground")
        .then(() => {
        console.log("Connected to MongoDB");
    })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
