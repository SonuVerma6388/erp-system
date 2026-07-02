import GlassCard from "../ui/GlassCard";
import { motion } from "framer-motion";

const RecentOrders = ({ orders = [] }) => {
  return (
    <GlassCard>
      <h2
        className="
          text-xl
          font-semibold
          text-white
          mb-6
        ">
        Recent Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{
              x: 5,
            }}
            className="
              flex
              justify-between
              items-center

              p-4

              rounded-xl

              bg-cyan-500/5
              border
              border-cyan-500/10
            ">
            <div>
              <p className="text-white">{order.order_number}</p>

              <p
                className="
                  text-xs
                  text-slate-400
                ">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-cyan-400">
                ₹{Number(order.total_amount).toLocaleString()}
              </p>

              <p
                className={`
                  text-xs
                  ${
                    order.payment_status === "paid"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                `}>
                {order.payment_status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default RecentOrders;
