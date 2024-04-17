/*
  In a more complex application, each model and schema should be in a separated file
  for simplicity's sake, I'll leave this all in a single file.
*/

import { Schema, model } from "mongoose";

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
  name: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  surname: { type: String, required: true },
});

const User = model<ServerUser>("User", userSchema);

export { User };
