// src/components/Sidebar.jsx
import { Bell, Clock, Home } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: Home, to: "/" },
  { name: "History", icon: Clock, to: "/history" },
  { name: "Smart Alerts", icon: Bell, to: "/alerts" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed md:static z-40 w-64 h-screen transition-transform duration-300
    bg-white shadow-lg md:bg-transparent md:shadow-none
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="p-6 border-b border-blue-200">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Vitals Tracker
        </Link>{" "}
      </div>
      <nav className="mt-6 mx-4 p-4 bg-white rounded-md shadow-lg border border-blue-200 space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
