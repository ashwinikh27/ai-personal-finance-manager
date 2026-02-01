const Income = require("../models/Income");

const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "Source and amount required" });
    }

    const income = await Income.create({
      user: req.user,
      source,
      amount,
      date,
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addIncome };
