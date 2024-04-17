/*
  In a more complex application, each model and schema should be in a separated file
  for simplicity's sake, I'll leave this all in a single file.
*/

import { Schema, model } from "mongoose";
const bcrypt = require("bcrypt");

interface ClientUser {
  id: string;
  avatar: string;
  age: number;
  email: string;
  name: string;
  role: "admin" | "user";
  surname: string;
}

interface ServerUser extends ClientUser {
  password: string;
}

const userSchema = new Schema<ServerUser>({
  id: { type: String, auto: true },
  avatar: String,
  age: Number,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  surname: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = process.env.HASH_SALT;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

const User = model<ServerUser>("User", userSchema);

export { User };
