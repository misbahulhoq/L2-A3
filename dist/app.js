"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./config/db.config");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// default middlewares
app.use(express_1.default.json());
// connect to database
(0, db_config_1.connectDB)();
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
(0, routes_1.default)(app);
app.use(errorHandler_1.default);
exports.default = app;
