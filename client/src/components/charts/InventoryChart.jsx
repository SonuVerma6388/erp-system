import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import GlassCard from "../ui/GlassCard";

const COLORS = ["#00F5FF", "#8B5CF6", "#22C55E", "#F59E0B", "#EF4444"];

const InventoryChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    value: Number(item.inventory_value),
  }));

  return (
    <GlassCard className="h-105">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Inventory Distribution
        </h2>

        <p className="text-slate-400 text-sm">Inventory Value by Product</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            animationDuration={1200}
            label>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Inventory Value",
            ]}
            contentStyle={{
              backgroundColor: "#0B1120",
              border: "1px solid #00F5FF",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

export default InventoryChart;
