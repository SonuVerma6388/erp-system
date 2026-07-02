import GlassCard from "../ui/GlassCard";

const OrderDetailsModal = ({ order, onClose, onPrint }) => {
  if (!order) return null;

  return (
    <div
      className="
        fixed
        inset-0

        bg-black/70
        backdrop-blur-sm

        flex
        justify-center
        items-center

        z-50
      ">
      <GlassCard
        className="
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
        ">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2
              className="
                text-3xl
                font-bold
                text-white
              ">
              Order Details
            </h2>

            <p className="text-slate-400 mt-1">{order.order_number}</p>
          </div>

          <button
            onClick={onClose}
            className="
              px-4
              py-2

              rounded-lg

              bg-red-500
              hover:bg-red-400

              text-white
            ">
            Close
          </button>
        </div>

        {/* Summary */}

        <div
          className="
            grid
            grid-cols-2
            gap-6
            mb-8
          ">
          <div>
            <p className="text-slate-400">Customer</p>

            <h3 className="text-white">
              {order.customer_name || "Walk-in Customer"}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">Cashier</p>

            <h3 className="text-white">{order.cashier_name}</h3>
          </div>

          <div>
            <p className="text-slate-400">Payment</p>

            <h3 className="text-cyan-400">{order.payment_method}</h3>
          </div>

          <div>
            <p className="text-slate-400">Status</p>

            <h3 className="text-green-400">{order.order_status}</h3>
          </div>
        </div>

        {/* Items */}

        <h3
          className="
            text-xl
            font-semibold
            text-white
            mb-4
          ">
          Order Items
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3">Product</th>

                <th>Qty</th>

                <th>Price</th>

                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items?.map((item) => (
                <tr key={item.product_id} className="border-b border-slate-800">
                  <td className="py-3">{item.product_name}</td>

                  <td className="text-center">{item.quantity}</td>

                  <td className="text-center">
                    ₹{Number(item.unit_price).toLocaleString()}
                  </td>

                  <td className="text-center">
                    ₹{Number(item.subtotal).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}

        <div
          className="
            mt-8

            border-t
            border-slate-700

            pt-6
          ">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>₹{Number(order.subtotal).toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Tax</span>

            <span>₹{Number(order.tax_amount).toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Discount</span>

            <span>₹{Number(order.discount_amount).toLocaleString()}</span>
          </div>

          <div
            className="
              flex
              justify-between

              mt-6

              text-2xl
              font-bold

              text-cyan-400
            ">
            <span>Total</span>

            <span>₹{Number(order.total_amount).toLocaleString()}</span>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onPrint}
            className="
              px-6
              py-3

              rounded-xl

              bg-cyan-500
              hover:bg-cyan-400

              text-black
              font-bold
            ">
            Print Receipt
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default OrderDetailsModal;
