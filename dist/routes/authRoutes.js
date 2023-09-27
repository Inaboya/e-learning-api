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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const router = express_1.default.Router();
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Must provide email and password" });
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(422).json({ error: "Invalid password or email" });
    }
    try {
        yield user.comparePassword(password);
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "MY_SECRET_KEY");
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
