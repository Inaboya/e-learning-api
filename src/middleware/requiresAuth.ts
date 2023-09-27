// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../model/User";
import { CustomRequests } from "../utils/custom";

export default (req: CustomRequests, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer laksjdflaksdjasdfklj'

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload: any) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};