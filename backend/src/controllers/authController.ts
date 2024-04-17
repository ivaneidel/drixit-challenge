import { Request, Response } from "express";
import { emailRegex } from "../utils/regex";
import { User } from "../database/schema";
import { generateJWTToken } from "../services/jwt";
const bcrypt = require("bcrypt");

const authController = async (req: Request, res: Response) => {
  const {
    email: bodyEmail,
    password: bodyPassword,
  }: { email: string; password: string } = req.body;

  const email = bodyEmail?.trim() ?? "";
  const password = bodyPassword?.trim() ?? "";

  // Return if parameters are invalid
  if (!email || !password)
    return res.status(422).json({
      error: "Couldn't authenticate",
      reason: "Invalid parameters",
    });

  // Return if email malformed
  if (!emailRegex.test(email))
    return res.status(400).json({
      error: "Couldn't authenticate",
      reason: "Malformed email",
    });

  const user = await User.findOne({ email });

  // Return if no user was found
  if (!user)
    return res.status(401).json({
      error: "Couldn't authenticate",
      reason: "Invalid credentials",
    });

  const { error, result } = await new Promise<{ error: any; result: boolean }>(
    (resolve, _) =>
      bcrypt.compare(password, user.password, (error: any, result: boolean) =>
        resolve({ error, result })
      )
  );

  // Return if there's an error or the password is invalid
  if (error || !result)
    return res.status(401).json({
      error: "Couldn't authenticate",
      reason: "Invalid credentials",
    });

  //
  // From this point forward, the user is correctly authenticated
  // We create a JWT token and return it to the client for them to use in later requests
  //

  const token = generateJWTToken(user._id.toString());

  res.json({ token });
};

export default authController;
