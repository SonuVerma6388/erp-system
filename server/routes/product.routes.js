import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", authenticate, getProductById);

router.post("/", authenticate, createProduct);

router.put("/:id", authenticate, updateProduct);

router.delete("/:id", authenticate, deleteProduct);

export default router;
