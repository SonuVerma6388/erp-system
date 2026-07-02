import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onUpdate, onRemove }) => {
  return (
    <div
      className="
        p-3
        rounded-xl
        bg-cyan-500/5
        border
        border-cyan-500/10
      ">
      <h3 className="text-white">{item.name}</h3>

      <p className="text-cyan-400">
        ₹{Number(item.selling_price).toLocaleString()}
      </p>

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(item.id, item.quantity - 1)}
            className="text-white">
            <FiMinus />
          </button>

          <span className="text-white">{item.quantity}</span>

          <button
            onClick={() => onUpdate(item.id, item.quantity + 1)}
            className="text-white">
            <FiPlus />
          </button>
        </div>

        <button onClick={() => onRemove(item.id)} className="text-red-400">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
