import express from "express";
// import mongoose from "mongoose";

import { login } from "../controllers/auth-controllers";

const router = express.Router();

router.post("/user/login", login);

// module.exports = router;
export default router;
