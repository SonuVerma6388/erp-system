import GlassCard from "../ui/GlassCard";

const ReceiptModal = ({ receipt, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        backdrop-blur-sm

        flex
        items-center
        justify-center

        z-50
      ">
      <GlassCard
        className="
          w-full
          max-w-xl
        ">
        <div className="text-center">
          <h2
            className="
              text-3xl
              font-bold
              text-cyan-400
            ">
            NOVA ERP
          </h2>

          <p className="text-slate-400">Sales Receipt</p>
        </div>

        <div className="mt-6 space-y-2">
          <p>
            <strong>Order:</strong> {receipt.order.order_number}
          </p>

          <p>
            <strong>Payment:</strong> {receipt.order.payment_method}
          </p>

          <p>
            <strong>Status:</strong> {receipt.order.payment_status}
          </p>
        </div>

        <div className="mt-6">
          <h3
            className="
              text-lg
              font-semibold
              mb-4
            ">
            Items
          </h3>

          <div className="space-y-3">
            {receipt.items.map((item) => (
              <div
                key={item.product_id}
                className="
                  flex
                  justify-between
                  border-b
                  border-slate-700
                  pb-2
                ">
                <div>
                  <p className="text-white">{item.product_name}</p>

                  <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                </div>

                <p>₹{item.subtotal.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="
            mt-6
            border-t
            border-slate-700
            pt-4
          ">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>₹{receipt.summary.subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Tax</span>

            <span>₹{receipt.summary.tax_amount.toLocaleString()}</span>
          </div>

          <div
            className="
              flex
              justify-between
              mt-4

              text-xl
              font-bold

              text-cyan-400
            ">
            <span>Total</span>

            <span>₹{receipt.summary.total_amount.toLocaleString()}</span>
          </div>
        </div>

        <div
          className="
            flex
            gap-4
            mt-8
          ">
          <button
            onClick={handlePrint}
            className="
              flex-1

              bg-cyan-500
              text-black

              font-semibold

              py-3
              rounded-xl
            ">
            Print Receipt
          </button>

          <button
            onClick={onClose}
            className="
              flex-1

              bg-slate-800

              text-white

              py-3
              rounded-xl
            ">
            Close
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default ReceiptModal;
