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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer laksjdflaksdjasdfklj'
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }
    const token = authorization.replace('Bearer ', '');
    jsonwebtoken_1.default.verify(token, 'MY_SECRET_KEY', (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        const { userId } = payload;
        const user = yield User.findById(userId);
        req.user = user;
        next();
    }));
};
