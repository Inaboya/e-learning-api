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
const User = mongoose.model("User");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Must provide email and password" });
    }
    const user = yield User.findOne({ email });
    if (!user) {
        return res.status(422).json({ error: "Invalid password or email" });
    }
    try {
        yield user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({
            token,
            user,
        });
    }
    catch (err) {
        return res.status(422).json({ error: "Invalid password or email" });
    }
}));
// module.exports = router;
exports.default = router;
