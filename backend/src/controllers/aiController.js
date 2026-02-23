
const Expense = require("../models/Expense");
console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);

const getFinancialInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });

    if (expenses.length === 0) {
      return res.json({
        insight: "No expenses found. Start tracking to receive insights.",
      });
    }

    let totalExpense = 0;
    let categoryTotals = {};

    expenses.forEach((expense) => {
      totalExpense += expense.amount;

      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + expense.amount;
    });

    // Find highest spending category
    const highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b
    );

    const highestAmount = categoryTotals[highestCategory];
    const percentage = ((highestAmount / totalExpense) * 100).toFixed(1);

    let advice = "";

    if (percentage > 50) {
      advice = `You are spending heavily on ${highestCategory}. Consider reducing it.`;
    } else if (percentage > 30) {
      advice = `Your highest spending is ${highestCategory}. Monitor it closely.`;
    } else {
      advice = "Your spending is well distributed across categories.";
    }

    res.json({
      insight: `
        Total Expense: ₹${totalExpense}.
        Highest spending category: ${highestCategory} (₹${highestAmount}, ${percentage}%).
        ${advice}
      `,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI error" });
  }
};

module.exports = { getFinancialInsights };