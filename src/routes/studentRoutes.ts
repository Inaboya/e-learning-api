// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Class = mongoose.model("Class");
// const Quiz = mongoose.model("Quiz");
// const requireAuth = require("../middleware/requireAuth");

// const router = express.Router();
import { Router } from "express";
import requiresAuth from "../middleware/requiresAuth";
import { quizAttempts } from "../controllers/student-controllers";


const router = Router();
////////////////        ATTEMPT QUIZ        /////////////////

router.patch("/quiz/attempt", requiresAuth, quizAttempts);

// module.exports = router;

export default router;
