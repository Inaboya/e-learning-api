"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, default: "" },
    name: { type: String, default: "", required: true },
    profileImage: { type: String, default: "" },
    userType: {
        type: String,
        required: true,
        enum: ["student", "teacher", "head", "admin"],
    },
    phoneNumber: { type: String, default: "" },
    isBlocked: { type: Boolean, default: false },
    password: { type: String },
});
// Add the comparePassword method to the userSchema
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this; // Cast this to IUser to access the method
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
};
// Create the User model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
