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
////////////////        ADD QUIZ        /////////////////
router.post("/quiz/add", requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, questions } = req.body;
    const attemptedBy = [];
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const quiz = new Quiz({
            title,
            questions,
            attemptedBy,
        });
        yield quiz.save();
        res.send({
            quiz,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        GET QUIZ DETAILS        /////////////////
router.get("/quiz/:id", requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const result = yield Quiz.findOne({ _id: id }).populate("attemptedBy", "name");
        res.send({ quiz: result });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        DELETE QUIZ       /////////////////
router.delete("/quiz/:id", requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        yield Quiz.deleteOne({ _id: id });
        res.send({ message: "Quiz deleted Succesfully" });
    }
    catch (err) {
        return res.status(422).send(err.message);
    }
}));
// module.exports = router;
exports.default = router;
