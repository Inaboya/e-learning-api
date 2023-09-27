import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import Class from "../model/Class";
import { CustomRequests } from "../utils/";

export const userCreate =  async (req: CustomRequests, res: Response) => {
    const { name, email, profileImage, phoneNumber, userType } = req.body;
    if (req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    const regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      return res.status(422).json({ error: "Must provide valid email" });
    }

    try {
      const user = new User({
        name,
        email,
        phoneNumber,
        profileImage,
        userType,
      });
      await user.save();

      res.send({
        user,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }


  export const getUsers = async (res: Response) => {
    try {
      let filters = {};
      let usersListing = await User.find(filters);
      let totalRecords = await User.countDocuments(filters);
      if (totalRecords <= 0) {
        return res.status(422).send({ error: "No users found" });
      }
      res.send({ users: usersListing, totalRecords: totalRecords });
    } catch (err: any) {
      return res.status(422).send({ error: err.message });
    }
  }

  export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    try {
      let user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(422).send({ error: "User Not found" });
      }
      res.send({ user });
    } catch (err: any) {
      return res.status(422).send({ error: err.message });
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updates = req.body;
  
    try {
      const result = await User.findByIdAndUpdate(id, updates, { new: true });
      res.send(result);
    } catch (err: any) {
      return res.status(422).json({ error: err.message });
    }
  }

  export const updateUserImage =   async (req: Request, res: Response) => {
    const id = req.params.id;
    const updates = req.body;
    try {
      const result = await User.findByIdAndUpdate(id, updates, { new: true });
      res.send(result);
    } catch (err: any) {
      return res.status(422).send(err.message);
    }
  }


  export const deleteUser = async (req: CustomRequests, res: Response) => {
    const id = req.params.id;

    if (req.user.userType !== "admin") {
      return res
        .status(422)
        .send({ error: "Only admin can use this facility" });
    }

    try {
      await User.deleteOne({ _id: id });
      res.send({ message: "User deleted Succesfully" });
    } catch (err: any) {
      return res.status(422).send(err.message);
    }
  }

  export const createClass =   async (req: CustomRequests, res: Response) => {
    const { className, classCode, teacherId, subject } = req.body;
    const students = [] as any[];

    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    try {
      const newClass = new Class({
        className,
        classCode,
        teacherId,
        subject,
        students,
      });
      await newClass.save();

      res.send({
        class: newClass,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }


  export const getClasses = async (req: CustomRequests, res: Response) => {
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    try {
      const classes = await Class.find();
      const totalClasses = await Class.countDocuments();
      if (totalClasses <= 0) {
        return res.status(422).send({ error: "No Class found" });
      }
      res.send({ classes, totalClasses });
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }


  export const updateStudentClass =  async (req: CustomRequests, res: Response) => {
    const { studentId, classId } = req.body;

    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    try {
      const result = await Class.updateOne(
        { _id: classId },
        { $push: { students: studentId } },
        { new: true }
      );
      res.send(result);
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }


  export const updateTeacherAssign = async (req: CustomRequests, res: Response) => {
    const { teacherId, classId } = req.body;

    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    try {
      const result = await Class.findByIdAndUpdate(
        { _id: classId },
        { teacherId },
        { new: true }
      );
      res.send(result);
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }

  export const getClassById =  async (req: CustomRequests, res: Response) => {
    const id = req.params.id;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    try {
      const result = await Class.findOne({ _id: id }).populate("students");
      res.send({ class: result });
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }

  export const updateClass = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updates = req.body;
  
    try {
      const result = await Class.findByIdAndUpdate(id, updates, { new: true });
      res.send(result);
    } catch (err: any) {
      return res.status(422).json({ error: err.message });
    }
  }

  export const deleteClass = async (req: CustomRequests, res: Response) => {
    const id = req.params.id;

    if (req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }

    try {
      await Class.deleteOne({ _id: id });
      res.send({ message: "Class deleted Succesfully" });
    } catch (err: any) {
      return res.status(422).send(err.message);
    }
  }