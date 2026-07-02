import express from "express";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerOrders,
} from "../controllers/customerController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createCustomer);
// add authenticate
router.get("/", getCustomers);

router.get("/:id", authenticate, getCustomerById);

router.get("/:id/orders", authenticate, getCustomerOrders);

export default router;
