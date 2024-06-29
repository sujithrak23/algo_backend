const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5400;
const expenseList = [
  {
    id: 0,
    date: "2024-01-20",
    title: "Fee",
    desc: "Paid the fee",
    type: 2,
    currency: 200,
  },
  {
    id: 1,
    date: "2024-04-20",
    title: "Travel",
    desc: "Travel Expenses",
    type: 1,
    currency: 50000,
  },

  {
    id: 2,
    date: "2024-01-20",
    title: "Salary",
    desc: "Salary of SDE ONLY",
    type: 2,
    currency: 200000,
  },
];

app.get("/expense_data", (req, res) => {
  res.status(200).json(expenseList);
});
app.get("/expense_data/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // res.status(200).json({ message: id });
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const data = expenseList.find((e) => e.id === parseInt(id, 10));
    if (!data) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
});

app.post("/expense_data", (req, res) => {
  const { date, title, desc, type, currency } = req.body;
  const newExpense = {
    id: expenseList.length,
    date,
    title,
    desc,
    type,
    currency,
  };
  expenseList.push(newExpense);
  res.status(201).json({ message: "Data added", data: newExpense });
});

app.delete("/expense_data/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = expenseList.findIndex((e) => e.id === id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (index === -1) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expenseList.splice(index, 1);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
});
app.put("/expense_data/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = expenseList.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  const updatedExpense = { ...expenseList[index], ...req.body };
  expenseList[index] = updatedExpense;
  res.json(updatedExpense);
});

app.listen(port, () => {
  console.log("My server is started on ", port);
});