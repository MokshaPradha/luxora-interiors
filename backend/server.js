const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy products (for learning)
const products = [
  {
    id: 1,
    name: "Luxury Sofa",
    price: 45000
  },
  {
    id: 2,
    name: "Wooden Dining Table",
    price: 60000
  },
  {
    id: 3,
    name: "King Size Bed",
    price: 85000
  }
];

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});     


