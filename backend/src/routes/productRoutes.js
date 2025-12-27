import express from "express";
import {
  getProducts,
  addProduct,
  getProductById,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, addProduct);

export default router;
