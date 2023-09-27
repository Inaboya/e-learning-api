import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../model/User";

const router = express.Router();

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({
      token,
      user,
    });
  } catch (err) {
    return res.status(422).json({ error: "Invalid password or email" });
  }
});

// module.exports = router;
export default router;
