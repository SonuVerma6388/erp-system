import GlassCard from "../ui/GlassCard";
import CartItem from "./CartItem";
import { useState } from "react";
import CustomerSelector from "./CustomerSelector";

const CartPanel = ({
  cart,
  subtotal,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerId, setCustomerId] = useState("");

  const taxAmount = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.selling_price) *
        item.quantity *
        Number(item.tax_percent || 0)) /
        100,
    0,
  );

  const total = subtotal + taxAmount;

  return (
    <GlassCard className="sticky top-6">
      <h2
        className="
          text-xl
          font-semibold
          text-white
          mb-6
        ">
        Cart
      </h2>
      <CustomerSelector customerId={customerId} setCustomerId={setCustomerId} />
      <div className="space-y-3">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-cyan-500/20">
        <div className="flex justify-between text-white">
          <span>Subtotal</span>

          <span>₹{subtotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white mb-3">Payment Method</h3>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="
      w-full
      bg-slate-900
      border
      border-cyan-500/20
      rounded-xl
      px-4
      py-3
      text-white
    ">
          <option value="cash">Cash</option>

          <option value="upi">UPI</option>

          <option value="card">Card</option>

          <option value="credit">Credit</option>
        </select>
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-slate-300">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-slate-300 mt-2">
          <span>Tax</span>
          <span>₹{taxAmount.toLocaleString()}</span>
        </div>

        <div
          className="
          justify-between
          flex
          text-xl
        text-white
          mt-4
          font-bold
          <span>Total</span>
         ">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <button
          onClick={() => onCheckout(customerId, paymentMethod)}
          disabled={cart.length === 0}
          className="
            w-full
            mt-6
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            font-bold
            py-3
            rounded-xl
            disabled:opacity-50
            ">
          Create Order
        </button>
      </div>
    </GlassCard>
  );
};

export default CartPanel;
