import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const data = req.body;
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    // Attach user if available (set by auth middleware)
    if (req.user && req.user.id) data.user = req.user.id;

    const order = await Order.create(data);
    return res.status(201).json(order);
  } catch (error) {
    console.error("placeOrder error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
