import {
  getDashboard,
  getSales,
  getInventory,
  getCustomersReport,
  getTopProductsReport,
  getLowStockReport,
} from "../services/reportService.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardReport = asyncHandler(async (req, res) => {
  const dashboard = await getDashboard();

  res.json(dashboard);
});

export const getSalesReportData = asyncHandler(async (req, res) => {
  const sales = await getSales();

  res.json(sales);
});

export const getInventoryReportData = asyncHandler(async (req, res) => {
  const inventory = await getInventory();

  res.json(inventory);
});

export const getCustomersReportData = asyncHandler(async (req, res) => {
  const customers = await getCustomersReport();

  res.json(customers);
});

export const getTopProductsData = asyncHandler(async (req, res) => {
  const products = await getTopProductsReport();

  res.json(products);
});

export const getLowStockData = asyncHandler(async (req, res) => {
  const data = await getLowStockReport();

  res.json(data);
});
