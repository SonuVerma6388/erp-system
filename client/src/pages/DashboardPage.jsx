import { FiDollarSign, FiShoppingCart, FiUsers, FiBox } from "react-icons/fi";

import StatCard from "../components/ui/StatCard";
import useDashboard from "../hooks/useDashboard";
import SalesChart from "../components/charts/SalesChart";
import useSalesReport from "../hooks/useSalesReport";
import InventoryChart from "../components/charts/InventoryChart";
import useInventoryReport from "../hooks/useInventoryReport";
import RecentOrders from "../components/widgets/RecentOrders";

import useRecentOrders from "../hooks/useRecentOrders";

import LowStockAlert from "../components/widgets/LowStockAlert";
import TopProductsWidget from "../components/widgets/TopProductsWidget";
import CustomerInsights from "../components/widgets/CustomerInsights";

import useLowStock from "../hooks/useLowStock";
import useTopProducts from "../hooks/useTopProducts";
import useCustomerInsights from "../hooks/useCustomerInsights";

const DashboardPage = () => {
  const { dashboard, loading, error } = useDashboard();
  const { sales, loading: salesLoading } = useSalesReport();
  const { inventory, loading: inventoryLoading } = useInventoryReport();
  const { orders, loading: ordersLoading } = useRecentOrders();
  const lowStock = useLowStock();
  const topProducts = useTopProducts();
  const customers = useCustomerInsights();

  if (loading) {
    return <div className="text-white">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">Failed to load dashboard</div>;
  }

  return (
    <div>
      {/* Header */}
      <h1
        className="
          text-3xl
          font-bold
          text-white
          mb-8
        ">
        Dashboard
      </h1>

      {/* KPI Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">
        <StatCard
          title="Total Sales"
          value={`₹${Number(dashboard.total_sales).toLocaleString()}`}
          icon={<FiDollarSign className="text-cyan-400 text-2xl" />}
          color="cyan"
        />

        <StatCard
          title="Orders"
          value={dashboard.total_orders}
          icon={<FiShoppingCart className="text-green-400 text-2xl" />}
          color="green"
        />

        <StatCard
          title="Customers"
          value={dashboard.total_customers}
          icon={<FiUsers className="text-purple-400 text-2xl" />}
          color="purple"
        />

        <StatCard
          title="Products"
          value={dashboard.total_products}
          icon={<FiBox className="text-red-400 text-2xl" />}
          color="red"
        />
      </div>

      {/* Charts */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        ">
        {!salesLoading && <SalesChart data={sales} />}

        {!inventoryLoading && <InventoryChart data={inventory} />}
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        {!ordersLoading && <RecentOrders orders={orders} />}
      </div>

      {/* Executive Widgets */}
      <div
        className="
            mt-8
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          ">
        <LowStockAlert products={lowStock} />

        <TopProductsWidget products={topProducts} />

        <CustomerInsights customers={customers} />
      </div>
    </div>
  );
};

export default DashboardPage;
