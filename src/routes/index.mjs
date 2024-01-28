import { Router } from "express";
import { userRouter } from "./users.mjs";

export const router = Router();
router.use(userRouter);
