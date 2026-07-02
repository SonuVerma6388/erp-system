import GlassCard from "../ui/GlassCard";
import { FiAlertTriangle } from "react-icons/fi";

const LowStockAlert = ({ products = [] }) => {
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-5">
        <FiAlertTriangle
          className="
            text-yellow-400
            text-xl
          "
        />

        <h2
          className="
            text-xl
            font-semibold
            text-white
          ">
          Low Stock Alerts
        </h2>
      </div>

      {products.length === 0 ? (
        <p className="text-green-400">All products sufficiently stocked</p>
      ) : (
        <div className="space-y-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="
                p-3
                rounded-xl
                bg-red-500/5
                border
                border-red-500/20
              ">
              <p className="text-white">{item.name}</p>

              <p className="text-sm text-slate-400">Stock: {item.quantity}</p>

              <p className="text-sm text-red-400">
                Reorder: {item.reorder_level}
              </p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default LowStockAlert;
