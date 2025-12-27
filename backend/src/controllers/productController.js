import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    console.error("getProducts error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.price) {
      return res.status(400).json({ message: "Title and price are required" });
    }
    const product = await Product.create(data);
    return res.status(201).json(product);
  } catch (error) {
    console.error("addProduct error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (error) {
    console.error("getProductById error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

