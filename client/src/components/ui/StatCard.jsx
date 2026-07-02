import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

const colorClasses = {
  cyan: "bg-cyan-500/10 border-cyan-500/20",
  green: "bg-green-500/10 border-green-500/20",
  purple: "bg-purple-500/10 border-purple-500/20",
  red: "bg-red-500/10 border-red-500/20",
};

const StatCard = ({ title, value, icon, color = "cyan" }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}>
      <GlassCard>
        <div className="flex justify-between items-center">
          <div>
            <p
              className="
                text-slate-400
                text-sm
                uppercase
                tracking-wider
              ">
              {title}
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-bold
                text-slate-100
              ">
              {value}
            </h2>
          </div>

          <div
            className={`
               h-14
               w-14
               rounded-xl
               flex
               items-center
               justify-center
               border
              ${colorClasses[color] || colorClasses.cyan}
            `}>
            {icon}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default StatCard;
