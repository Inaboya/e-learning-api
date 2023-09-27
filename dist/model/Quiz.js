"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
    answer: { type: String },
});
const quizSchema = new mongoose_1.default.Schema({
    title: { type: String },
    questions: [questionSchema],
    attemptedBy: [
        {
            student: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
            score: { type: Number },
        },
    ],
});
const Quiz = mongoose_1.default.model("Quiz", quizSchema);
exports.default = Quiz;
