// const mongoose = require("mongoose");
import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  className: {
    type: String,
  },
  classCode: {
    type: String,
  },
  subject: {
    type: String,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Class = mongoose.model("Class", classSchema);

export default Class;
