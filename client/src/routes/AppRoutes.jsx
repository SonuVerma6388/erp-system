import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import CustomersPage from "../pages/CustomersPage";
import POSPage from "../pages/POSPage";
import OrdersPage from "../pages/OrdersPage";

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/" element={<POSPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
