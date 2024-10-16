require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware to parse JSON before routes
app.use(express.json());

// Import routes
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

// Use routes after middleware
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("We will win this race!");
});

// MongoDB connection
const port = process.env.PORT || 3000;
const MongoDB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MongoDB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`MongoDB connected and Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
