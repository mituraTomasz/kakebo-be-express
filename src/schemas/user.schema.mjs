import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
  },
  "Kakebo.users"
);

export const User = mongoose.model("User", userSchema);
