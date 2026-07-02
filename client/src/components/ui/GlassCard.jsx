import { motion } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        backdrop-blur-xl
        bg-white/5

        border
        border-cyan-500/20

        rounded-2xl

        shadow-lg
        shadow-cyan-500/5

        p-6

        ${className}
      `}>
      {children}
    </motion.div>
  );
};

export default GlassCard;
