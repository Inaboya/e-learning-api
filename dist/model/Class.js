"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const classSchema = new mongoose_1.default.Schema({
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    className: {
        type: String,
    },
    classCode: {
        type: String,
    },
    subject: {
        type: String,
    },
    students: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
});
const Class = mongoose_1.default.model("Class", classSchema);
exports.default = Class;
