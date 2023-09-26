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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Class = mongoose.model("Class");
const Quiz = mongoose.model("Quiz");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
////////////////        ATTEMPT QUIZ        /////////////////
router.patch("/quiz/attempt", requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId, studentId, score } = req.body;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const result = yield Quiz.updateOne({ _id: quizId }, { $push: { attemptedBy: { student: studentId, score: score } } }, { new: true });
        res.send(result);
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
// module.exports = router;
exports.default = router;
