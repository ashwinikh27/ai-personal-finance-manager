const Expense = require("../models/Expense");
const Income = require("../models/Income");

const getMonthlySummary = async (req, res) => {
  try {
    const start = new Date();
    start.setDate(1);

    const expenses = await Expense.aggregate([
      { $match: { user: req.user, date: { $gte: start } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const income = await Income.aggregate([
      { $match: { user: req.user, date: { $gte: start } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalExpense: expenses[0]?.total || 0,
      totalIncome: income[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMonthlySummary };
