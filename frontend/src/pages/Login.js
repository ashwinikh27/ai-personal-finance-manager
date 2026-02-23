import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      console.log("LOGIN RESPONSE:", res.data);

if (res.data.data?.token) {
  localStorage.setItem("token", res.data.data.token);
  navigate("/dashboard");
} else {
  alert("Login failed: No token received");
}
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>

      <p>
        New user? <a href="/register">Register here</a>
      </p>
    </form>
  );
}

export default Login;
