import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: false,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
  },
  "Kakebo.users"
);

export const User = mongoose.model("User", userSchema);
