import { Router } from "express";
import authController from "../controllers/authController";
import profileController from "../controllers/profileController";
import dotenv from "dotenv";
import { expressjwt } from "express-jwt";

const router = Router();

dotenv.config();

router.post("/authenticate", authController);
router.get(
  "/users/me",
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ["HS256"],
  }),
  profileController
);

export default router;
