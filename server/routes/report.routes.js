import express from "express";

import {
  getDashboardReport,
  getSalesReportData,
  getInventoryReportData,
  getCustomersReportData,
  getTopProductsData,
  getLowStockData,
} from "../controllers/reportController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", getDashboardReport);
router.get("/sales", getSalesReportData);
router.get("/inventory", getInventoryReportData);
router.get("/customers", getCustomersReportData);
router.get("/top-products", getTopProductsData);
router.get("/low-stock", getLowStockData);

export default router;
