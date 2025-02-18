import mongoose from "mongoose";
import { USER_ROLE } from "../config/enums/enums.js";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: [USER_ROLE.ADMIN, USER_ROLE.CLIENT, USER_ROLE.FREELANCER],
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  clientProfile: {
    type: mongoose.Schema.ObjectId,
    ref: "ClientProfile",
  }
});

export const UserModel = mongoose.model("User", userSchema);
