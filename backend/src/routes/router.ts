import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/authenticate", authController);

export default router;
