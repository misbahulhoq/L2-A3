"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, payload) => {
    return res.status(200).json(Object.assign({}, payload));
};
exports.sendResponse = sendResponse;
exports.default = sendResponse;
