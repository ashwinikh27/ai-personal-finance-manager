import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseRes = await api.get("/api/expenses");
        const summaryRes = await api.get("/api/summary/monthly");

        setExpenses(expenseRes.data);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error(error);

        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

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
