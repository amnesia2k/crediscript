import mongoose from "mongoose";
import { createId } from "@paralleldrive/cuid2";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => createId(),
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    bio: {
      type: String,
      default: "This user has no bio",
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
