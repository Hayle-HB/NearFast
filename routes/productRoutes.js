const express = require("express");
const router = express.Router();
const {
  handleAddProduct,
  handleFetchALLProduct,
  handleFetchByID,
  handleUpdateProduct,
  handleDeleteProduct,
} = require("../controllers/ProductController.js");

// Route for adding a product
router.post("/products", handleAddProduct); // Use POST for adding products

// Route for fetching all products
router.get("/products", handleFetchALLProduct); // Use GET for fetching all products

// Route for fetching a product by ID
router.get("/products/:id", handleFetchByID); // Use GET for fetching a specific product by ID

// Route for updating a product by ID
router.put("/products/:id", handleUpdateProduct); // Use PUT for updating a product

// Route for deleting a product by ID
router.delete("/products/:id", handleDeleteProduct); // Use DELETE for deleting a product

module.exports = router;
