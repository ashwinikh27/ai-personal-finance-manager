
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
const [newExpense, setNewExpense] = useState({
  title: "",
  amount: "",
  category: "",
});

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

const handleAddExpense = async (e) => {
  e.preventDefault();

  try {
    await api.post("/api/expenses", newExpense);

    alert("Expense added!");

    // Refresh data
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (id) => {
  try {
    await api.delete(`/api/expenses/${id}`);
    setExpenses(expenses.filter((e) => e._id !== id));
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseRes = await api.get("/api/expenses");

        setExpenses(expenseRes.data);
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

const categoryTotals = expenses.reduce((acc, expense) => {
  acc[expense.category] =
    (acc[expense.category] || 0) + expense.amount;
  return acc;
}, {});

const pieData = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      data: Object.values(categoryTotals),
    },
  ],
};


const barData = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "Amount",
      data: [0, totalExpense],    },
  ],
};



return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    {/* Add Expense Card */}
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
      <form onSubmit={handleAddExpense} className="flex gap-4">
        <input
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) =>
            setNewExpense({ ...newExpense, title: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <button className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">₹0</p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Expense</h3>
        <p className="text-2xl font-bold text-red-600">
          ₹{totalExpense}
        </p>
      </div>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="mb-4 font-semibold">Expense Breakdown</h3>
        <div className="h-80">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="mb-4 font-semibold">Income vs Expense</h3>
        <div className="h-80">
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>

    {/* Expense List */}
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Expenses</h3>
      <ul className="space-y-3">
  {expenses.map((e) => (
    <li
      key={e._id}
      className="flex justify-between items-center bg-gray-50 p-3 rounded"
    >
      <div>
        <p className="font-medium">{e.title}</p>
        <p className="text-sm text-gray-500">{e.category}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-800">
          ₹{e.amount}
        </span>

        <button
          onClick={() => handleDelete(e._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
    </div>

  </div>
);
}

export default Dashboard;
