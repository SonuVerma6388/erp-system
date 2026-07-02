import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const statusColors = {
  completed: "bg-green-500/20 text-green-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const paymentColors = {
  paid: "bg-cyan-500/20 text-cyan-400",
  pending: "bg-orange-500/20 text-orange-400",
};

const OrdersTable = ({ orders, onView }) => {
  return (
    <GlassCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20 text-slate-400">
              <th className="text-left py-4">Order</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Cashier</th>
              <th className="text-right">Total</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                whileHover={{
                  backgroundColor: "rgba(6,182,212,0.05)",
                }}
                className="border-b border-slate-800">
                <td className="py-5 font-semibold text-white">
                  {order.order_number}
                </td>

                <td className="text-slate-300">
                  {order.customer_name || "Walk-in Customer"}
                </td>

                <td className="text-slate-300">{order.cashier_name}</td>

                <td className="text-right text-cyan-400 font-semibold">
                  ₹{Number(order.total_amount).toLocaleString()}
                </td>

                <td className="text-center">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        paymentColors[order.payment_status] ||
                        paymentColors.pending
                      }
                    `}>
                    {order.payment_status}
                  </span>
                </td>

                <td className="text-center">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        statusColors[order.order_status] || statusColors.pending
                      }
                    `}>
                    {order.order_status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => onView(order.id)}
                    className="
                      px-4
                      py-2
                      rounded-lg
                      bg-cyan-500
                      hover:bg-cyan-400
                      text-black
                      font-semibold
                    ">
                    View
                  </button>
                </td>
              </motion.tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="
                    py-10
                    text-center
                    text-slate-400
                  ">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default OrdersTable;
