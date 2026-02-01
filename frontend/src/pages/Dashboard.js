import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  if (!localStorage.getItem("token")) {
  return <p>Please login</p>;
}

  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const expenseRes = await api.get("/api/expenses");
      const summaryRes = await api.get("/api/summary/monthly");

      setExpenses(expenseRes.data);
      setSummary(summaryRes.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Monthly Summary</h3>
      <p>Total Income: ₹{summary.totalIncome}</p>
      <p>Total Expense: ₹{summary.totalExpense}</p>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((e) => (
          <li key={e._id}>
            {e.title} - ₹{e.amount} ({e.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
