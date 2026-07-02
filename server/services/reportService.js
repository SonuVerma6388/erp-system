import {
  getDashboardStats,
  getSalesReport,
  getInventoryReport,
  getTopCustomers,
  getTopProducts,
  getLowStockProducts,
} from "../repositories/reportRepository.js";

export const getDashboard = async () => {
  const stats = await getDashboardStats();

  return {
    total_products: Number(stats.total_products),
    total_customers: Number(stats.total_customers),
    total_orders: Number(stats.total_orders),
    total_sales: Number(stats.total_sales),
    low_stock_products: Number(stats.low_stock_products),
  };
};

export const getSales = async () => {
  return await getSalesReport();
};

export const getInventory = async () => {
  return await getInventoryReport();
};

export const getCustomersReport = async () => {
  return await getTopCustomers();
};

export const getTopProductsReport = async () => {
  return await getTopProducts();
};

export const getLowStockReport = async () => {
  return await getLowStockProducts();
};
