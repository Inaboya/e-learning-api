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
// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const User = mongoose.model("User");
// const Class = mongoose.model("Class");
// const requireAuth = require("../middleware/requireAuth");
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const Class_1 = __importDefault(require("../models/Class"));
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = express_1.default.Router();
////////////////        ADD TEACHER / STUDENT / HEAD        /////////////////
router.post("/user/create", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, profileImage, phoneNumber, userType } = req.body;
    if (req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
        return res.status(422).json({ error: "Must provide valid email" });
    }
    try {
        const user = new User_1.default({
            name,
            email,
            phoneNumber,
            profileImage,
            userType,
        });
        yield user.save();
        res.send({
            user,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        GET USERS / DASHOBOARD       /////////////////
router.get("/users", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filters = {};
        let usersListing = yield User_1.default.find(filters);
        let totalRecords = yield User_1.default.countDocuments(filters);
        if (totalRecords <= 0) {
            return res.status(422).send({ error: "No users found" });
        }
        res.send({ users: usersListing, totalRecords: totalRecords });
    }
    catch (err) {
        return res.status(422).send({ error: err.message });
    }
}));
////////////////        GET USER       /////////////////
router.get("/user/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let user = yield User_1.default.findOne({ _id: id });
        if (!user) {
            return res.status(422).send({ error: "User Not found" });
        }
        res.send({ user });
    }
    catch (err) {
        return res.status(422).send({ error: err.message });
    }
}));
////////////////        EDIT USER / DASHOBOARD       /////////////////
router.patch("/user/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updates = req.body;
    try {
        const result = yield User_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.send(result);
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        UPLOAD USER IMAGE       /////////////////
router.patch("/user/uploadImage/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updates = req.body;
    try {
        const result = yield User_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.send(result);
    }
    catch (err) {
        return res.status(422).send(err.message);
    }
}));
////////////////        DELETE USER / DASHOBOARD       /////////////////
router.delete("/user/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.user.userType !== "admin") {
        return res.status(422).send({ error: "Only admin can use this facility" });
    }
    try {
        yield User_1.default.deleteOne({ _id: id });
        res.send({ message: "User deleted Succesfully" });
    }
    catch (err) {
        return res.status(422).send(err.message);
    }
}));
////////////////        ADD CLASS        /////////////////
router.post("/class/create", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { className, classCode, teacherId, subject } = req.body;
    const students = [];
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const newClass = new Class_1.default({
            className,
            classCode,
            teacherId,
            subject,
            students,
        });
        yield newClass.save();
        res.send({
            class: newClass,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        GET CLASSES        /////////////////
router.get("/classes", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const classes = yield Class_1.default.find();
        const totalClasses = yield Class_1.default.countDocuments();
        if (totalClasses <= 0) {
            return res.status(422).send({ error: "No Class found" });
        }
        res.send({ classes, totalClasses });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        ADD STUDENT TO CLASS        /////////////////
router.patch("/student/add", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, classId } = req.body;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const result = yield Class_1.default.updateOne({ _id: classId }, { $push: { students: studentId } }, { new: true });
        res.send(result);
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        ASSIGN TEACHER TO CLASS        /////////////////
router.patch("/teacher/assign", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, classId } = req.body;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const result = yield Class_1.default.findByIdAndUpdate({ _id: classId }, { teacherId }, { new: true });
        res.send(result);
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        GET CLASS DETAILS        /////////////////
router.get("/class/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        const result = yield Class_1.default.findOne({ _id: id }).populate("students");
        res.send({ class: result });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        EDIT CLASS       /////////////////
router.patch("/class/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updates = req.body;
    try {
        const result = yield Class_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.send(result);
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}));
////////////////        DELETE CLASS       /////////////////
router.delete("/class/:id", requireAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.user.userType !== "admin") {
        return res.status(422).send({ error: "Access Denied" });
    }
    try {
        yield Class_1.default.deleteOne({ _id: id });
        res.send({ message: "Class deleted Succesfully" });
    }
    catch (err) {
        return res.status(422).send(err.message);
    }
}));
exports.default = router;
