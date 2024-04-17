import { Request, Response } from "express";
import { User } from "../database/schema";

const profileController = async (req: Request, res: Response) => {
  // @ts-ignore // Ignore as auth is not a valid Request property
  const id = req.auth.id;

  const user = await User.findById(id).select("-password").lean();

  if (!user)
    return res.status(404).json({
      error: "Not found",
      reason: "User not found",
    });

  res.json({ ...user });
};

export default profileController;
