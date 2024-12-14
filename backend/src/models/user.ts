import mongoose from "mongoose"
import { UserType } from "../types/types";

const userSchema =  new mongoose.Schema({
    username: {type: String,required: true},
    email: { type: String, required: true, unique: true },
    password: String,
    createdAt: Date,
    updatedAt: Date
},
{
    timestamps : true
  }
)

const User =  mongoose.model<UserType>('User', userSchema);

export default User;
