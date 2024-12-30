import mongoose from "mongoose"
import { UserType } from "../types/types";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional, for users signing up without Google
    googleId: { type: String, unique: true }, // Unique identifier for Google users
    profilePicture: { type: String }, // Optional profile picture URL
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const User =  mongoose.model<UserType>('User', userSchema);

export default User;
