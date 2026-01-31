const express = require("express");
const cors = require("cors");
const { protect } = require("./middleware/authMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/expenses", require("./routes/expenseRoutes"));


app.get("/", (req, res) => {
  res.send("API is running");
});


app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed" });
});

app.use(errorHandler);


module.exports = app;
