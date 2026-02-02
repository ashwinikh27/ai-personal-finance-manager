import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // 🔐 Auto-redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );
      alert("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </form>
  );
}

export default Register;
