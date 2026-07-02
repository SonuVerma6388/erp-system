import { motion } from "framer-motion";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
      }}
      className="
        h-20
        px-8
        flex
        items-center
        justify-between

        bg-[#0B1120]/80
        backdrop-blur-xl

        border-b
        border-cyan-500/20
      ">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <div>
          <h2
            className="
            text-2xl
            font-semibold
            text-slate-100
          ">
            Dashboard
          </h2>

          <p
            className="
            text-sm
            text-slate-400
          ">
            Welcome to ERP
          </p>
        </div>
      </div>

      {/* Center Search */}
      <div
        className="
          hidden
          md:flex
          items-center

          w-100

          bg-cyan-500/5
          border
          border-cyan-500/20

          rounded-xl

          px-4
          py-3
        ">
        <FiSearch
          className="
            text-cyan-400
            mr-3
          "
        />

        <input
          type="text"
          placeholder="Search products, orders..."
          className="
            bg-transparent
            outline-none
            w-full

            text-slate-200
            placeholder:text-slate-500
          "
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Online Status */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
          ">
          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-green-500
              animate-pulse
            "
          />

          <span
            className="
              text-sm
              text-slate-400
            ">
            Online
          </span>
        </div>

        {/* Notification */}
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            relative

            h-11
            w-11

            flex
            items-center
            justify-center

            rounded-xl

            bg-cyan-500/5

            border
            border-cyan-500/20
          ">
          <FiBell
            size={20}
            className="
              text-cyan-400
            "
          />

          <span
            className="
              absolute
              top-2
              right-2

              h-2
              w-2

              rounded-full
              bg-red-500
            "
          />
        </motion.button>

        {/* Profile */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="
            flex
            items-center
            gap-3

            px-3
            py-2

            rounded-xl

            bg-cyan-500/5

            border
            border-cyan-500/20

            cursor-pointer
          ">
          <div
            className="
              h-10
              w-10

              rounded-full

              flex
              items-center
              justify-center

              bg-cyan-500/10
            ">
            <FiUser
              className="
                text-cyan-400
              "
            />
          </div>

          <div className="hidden md:block">
            <p
              className="
                text-sm
                font-medium
                text-slate-200
              ">
              Sonu Verma
            </p>

            <p
              className="
                text-xs
                text-slate-400
              ">
              Administrator
            </p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
