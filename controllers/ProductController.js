const Product = require("../models/Product.js");

const handleAddProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      description,
      price,
      currency,
      stock,
      category_id,
      image_url,
      seller_id, // read from cookie
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      currency: currency || "ETB",
      stock,
      category_id,
      image_url,
      seller_id,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

const handleFetchALLProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch products",
    });
  }
};

const handleFetchByID = async (req, res) => {
  try {
    const _id = req.params.id; // Access the ID from request parameters

    const product = await Product.findById(_id); // Use await to get the product

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "success",
      product: product,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const handleUpdateProduct = async (req, res) => {
  try {
    const _id = req.params.id; // Get the product ID from request parameters
    const updatedData = req.body; // Get the updated data from the request body

    const updatedProduct = await Product.findByIdAndUpdate(_id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators run on the updated data
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const _id = req.params.id; // Get the product ID from request parameters

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  handleAddProduct,
  handleFetchALLProduct,
  handleFetchByID,
  handleUpdateProduct,
  handleDeleteProduct,
};
