// import express, { Request, Response } from "express";
import { Router } from "express";
import {
  createClass,
  deleteClass,
  deleteUser,
  getClassById,
  getClasses,
  getUserById,
  getUsers,
  updateClass,
  updateStudentClass,
  updateTeacherAssign,
  updateUser,
  updateUserImage,
  userCreate,
} from "../controllers/admin-controllers";
import requireAuth from "../middleware/requiresAuth";
// import mongoose from "mongoose";

const router = Router();

////////////////        ADD TEACHER / STUDENT / HEAD        /////////////////

router.post("/user/create", requireAuth, userCreate);

////////////////        GET USERS / DASHOBOARD       /////////////////

router.get("/users", requireAuth, getUsers);

////////////////        GET USER       /////////////////

router.get("/user/:id", requireAuth, getUserById);

////////////////        EDIT USER / DASHOBOARD       /////////////////

router.patch("/user/:id", requireAuth, updateUser);

////////////////        UPLOAD USER IMAGE       /////////////////

router.patch("/user/uploadImage/:id", requireAuth, updateUserImage);

////////////////        DELETE USER / DASHOBOARD       /////////////////

router.delete("/user/:id", requireAuth, deleteUser);

////////////////        ADD CLASS        /////////////////

router.post("/class/create", requireAuth, createClass);

////////////////        GET CLASSES        /////////////////

router.get("/classes", requireAuth, getClasses);

////////////////        ADD STUDENT TO CLASS        /////////////////

router.patch("/student/add", requireAuth, updateStudentClass);

////////////////        ASSIGN TEACHER TO CLASS        /////////////////

router.patch("/teacher/assign", requireAuth, updateTeacherAssign);

////////////////        GET CLASS DETAILS        /////////////////

router.get("/class/:id", requireAuth, getClassById);

////////////////        EDIT CLASS       /////////////////

router.patch("/class/:id", requireAuth, updateClass);

////////////////        DELETE CLASS       /////////////////

router.delete("/class/:id", requireAuth, deleteClass);

export default router;
