import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define an interface for the user document
interface IUser extends mongoose.Document {
    email: string;
    name: string;
    profileImage: string;
    userType: "student" | "teacher" | "head" | "admin";
    phoneNumber: string;
    isBlocked: boolean;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }
  
  // Define the user schema
  const userSchema = new mongoose.Schema({
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
  userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    const user = this as IUser; // Cast this to IUser to access the method
  
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
  
        if (!isMatch) {
          return reject(false);
        }
  
        resolve(true);
      });
    });

}
  
  // Create the User model
  const User = mongoose.model<IUser>("User", userSchema);
  export default User;
  