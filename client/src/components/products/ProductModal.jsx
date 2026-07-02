import { motion } from "framer-motion";

const ProductModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/60
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      ">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          w-full
          max-w-2xl

          bg-[#0B1120]
          border
          border-cyan-500/20

          rounded-2xl

          p-6
        ">
        <div className="flex justify-between mb-6">
          <h2
            className="
            text-xl
            font-semibold
            text-white
            ">
            Add Product
          </h2>

          <button
            onClick={onClose}
            className="
            text-slate-400
            hover:text-white
            ">
            ✕
          </button>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default ProductModal;
