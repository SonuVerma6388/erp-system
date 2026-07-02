import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  getRecentOrdersController,
  updateOrderStatusController,
  deleteOrderController,
} from "../controllers/orderController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/recent", getRecentOrdersController);

router.get("/:id", getOrderById);

router.patch("/:id/status", authenticate, updateOrderStatusController);

router.delete("/:id", authenticate, deleteOrderController);

export default router;
