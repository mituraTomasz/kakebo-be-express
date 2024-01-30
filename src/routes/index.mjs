import { Router } from "express";
import { userRouter } from "./users.mjs";
import { dailyExpensesRouter } from "./daily-expenses.mjs";

export const router = Router();
router.use(userRouter);
router.use(dailyExpensesRouter);
