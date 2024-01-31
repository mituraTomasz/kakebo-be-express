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
dailyExpensesRouter.post("/api/daily-expenses/add", async (req, res) => {
  try {
    const { title, amount, date, ownerId } = req.body.dailyExpense;
    const dailyExpense = {
      title,
      amount,
      date,
      ownerId,
    };
    const newDailyExpense = new DailyExpense(dailyExpense);
    const savedUser = newDailyExpense.save();
    const formatedDailyExpense = {
      ...dailyExpense,
      id: newDailyExpense._id.toString(),
    };

    return res.status(200).send(formatedDailyExpense);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// ***REMOVE DAILY EXPENSE***
dailyExpensesRouter.delete("/api/daily-expenses/delete/:id", (req, res) => {
  const { id } = req.params;

  DailyExpense.findOneAndDelete({ _id: id })
    .then((result) => {
      if (result) {
        console.log("Element został pomyślnie usunięty.");

        return res.status(200).send({ msg: "ok boomer" });
      } else {
        console.log("Operacja nie została potwierdzona.");
      }
    })
    .catch((err) => {
      console.error("Błąd podczas usuwania elementu:", err);
    });
});

// ***UPDATE DAILY EXPENSE***
dailyExpensesRouter.put("/api/daily-expenses/put", (req, res) => {
  const { id, ownerId, date, amount, title } = req.body;
  const updatedDate = new Date(date);

  console.log("id", id);

  DailyExpense.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        title,
        amount,
        updatedDate,
        ownerId,
      },
    }
  )
    .then(() => {
      console.log("Element został pomyślnie zaktualizowany.");
      res.send({ msg: "ok boomer" });
    })
    .catch((err) => {
      console.error("Błąd podczas aktualizacji elementu:", err);
    });
});
