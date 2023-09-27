import jwt from "jsonwebtoken";
import User from "../model/User";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
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
    } catch (err: any) {
      return res.status(422).json({ error: "Invalid password or email" });
    }
  }