import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiVideo,
  FiCalendar,
  FiBook,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/admin/dashboard" },
    { name: "Videos", icon: <FiVideo />, path: "/admin/videos" },
    { name: "Availability", icon: <FiCalendar />, path: "/admin/availability" },
    { name: "Appointments", icon: <FiBook />, path: "/admin/appointments" },
    { name: "Profile", icon: <FiUser />, path: "/admin/profile" },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#5C4033] rounded-r-[40px] text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-10">EditFlow</h1>

      <nav className="space-y-3 flex-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive ? "bg-[#708238]" : "hover:bg-[#6D4C41]"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition"
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
