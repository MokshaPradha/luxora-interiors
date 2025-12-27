import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    // Clear collections
    await Product.deleteMany({});
    await User.deleteMany({});

    const products = [
      {
        title: "Modern Sofa",
        price: 499,
        description: "Comfortable modern sofa",
        category: "living",
        images: [
          "https://images.unsplash.com/photo-1759229874865-20a8c780c86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        ],
        features: ["High density foam cushions", "Solid wood frame", "Premium fabric"],
        specifications: { Material: "Fabric", Dimensions: "200 x 90 x 85 cm" },
        reviewsList: [{ name: "Admin", rating: 5, comment: "Seed product." }],
      },
      {
        title: "Wooden Dining Table",
        price: 799,
        description: "Solid wood dining table",
        category: "dining",
        images: [
          "https://images.unsplash.com/photo-1595515106864-077d30192c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        ],
        features: ["Solid oak construction", "Seats 6 comfortably"],
        specifications: { Material: "Oak", Dimensions: "180 x 90 x 75 cm" },
        reviewsList: [{ name: "Admin", rating: 5, comment: "Seed product." }],
      },
    ];

    await Product.insertMany(products);

    const hashed = await bcrypt.hash("password123", 10);
    await User.create({ name: "Admin", email: "admin@example.com", password: hashed, isAdmin: true });

    console.log("Seed complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
