import { Router } from "express";
import { DailyExpense } from "../schemas/daily-expense.schema.mjs";

export const dailyExpensesRouter = Router();

// ***GET DAILY EXPENSES***
dailyExpensesRouter.post("/api/daily-expenses/get", async (req, res) => {
  try {
    const { ownerId } = req.body;
    const query = { ownerId };
    const dailyExpenses = await DailyExpense.find(query);

    const updatedDailyexpenses = dailyExpenses.map((dailyExpense) => ({
      id: dailyExpense._id,
      title: dailyExpense.title,
      amount: dailyExpense.amount,
      date: dailyExpense.date,
      ownerId: dailyExpense.ownerId,
    }));

    return res.status(200).send(updatedDailyexpenses);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// ***ADD NEW DAILY EXPENSE***
dailyExpensesRouter.post("/api/daily-expenses/add", (req, res) => {
  try {
    const { title, amount, date, ownerId } = req.body;
    const newDailyExpense = new DailyExpense({
      title,
      amount,
      date,
      ownerId,
    });
    const savedUser = newDailyExpense.save();

    return res.status(200).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
