const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const expense = await Expense.create({
      user: req.user,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense };
