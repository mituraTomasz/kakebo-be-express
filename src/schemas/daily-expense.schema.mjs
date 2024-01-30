import mongoose from "mongoose";

const dailyExpenseSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const DailyExpense = mongoose.model("daily-expenses", dailyExpenseSchema);
