import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiMonitor,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  {
    name: "POS",
    icon: FiMonitor,
    path: "/",
  },
  {
    name: "Products",
    icon: FiBox,
    path: "/products",
  },
  {
    name: "Orders",
    icon: FiShoppingCart,
    path: "/orders",
  },
  {
    name: "Customers",
    icon: FiUsers,
    path: "/customers",
  },
  {
    name: "Reports",
    icon: FiBarChart2,
    path: "/reports",
  },
  {
    name: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
];

const Sidebar = () => {
  return (
    <aside
      className="
      h-screen
      w-72
      bg-[#0B1120]/90
      backdrop-blur-xl
      border-r
      border-cyan-500/20
      flex
      flex-col
      ">
      {/* Logo */}
      <div
        className="
        h-20
        flex
        items-center
        justify-center
        border-b
        border-cyan-500/20
        ">
        <h1
          className="
          text-2xl
          font-bold
          text-cyan-400
          tracking-widest
          ">
          ERP
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300
                ${
                  isActive
                    ? `
                      bg-cyan-500/10
                      text-cyan-400
                      border
                      border-cyan-500/30
                    `
                    : `
                      text-slate-300
                      hover:bg-cyan-500/5
                      hover:text-cyan-300
                    `
                }
                `
              }>
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    x: 5,
                  }}
                  className="flex items-center gap-4">
                  <Icon size={20} className={isActive ? "text-cyan-400" : ""} />

                  <span className="font-medium">{item.name}</span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="
        p-4
        border-t
        border-cyan-500/20
        ">
        <div
          className="
          rounded-xl
          bg-cyan-500/5
          border
          border-cyan-500/20
          p-4
          ">
          <p className="text-xs text-slate-400">ERP v1.0</p>

          <p className="text-cyan-400 text-sm">Enterprise Edition</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
