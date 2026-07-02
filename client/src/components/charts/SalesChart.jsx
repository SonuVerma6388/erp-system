import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import GlassCard from "../ui/GlassCard";

const SalesChart = ({ data = [] }) => {
  const formattedData = data.map((item) => ({
    ...item,
    sales: Number(item.sales),
    orders: Number(item.orders),
  }));

  return (
    <GlassCard className="h-105">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Sales Analytics</h2>

        <p className="text-slate-400 text-sm">Revenue Overview</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={formattedData}>
          <CartesianGrid stroke="#1E293B" strokeDasharray="4 4" />

          <XAxis dataKey="sale_date" stroke="#94A3B8" />

          <YAxis stroke="#94A3B8" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0B1120",
              border: "1px solid #00F5FF",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#00F5FF"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#00F5FF",
            }}
            activeDot={{
              r: 8,
            }}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

export default SalesChart;
