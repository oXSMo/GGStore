import { NavLink } from "react-router-dom";
import { Terminal, LayoutDashboard, Boxes } from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      name: "Orders",
      path: "/orders",
      icon: Boxes,
    },
    {
      name: "Products",
      path: "products",
      icon: LayoutDashboard,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#111] text-white border-r border-white/10 p-5">
      <h2 className="text-xl font-bold mb-10">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
