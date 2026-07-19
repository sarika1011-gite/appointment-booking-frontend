import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiUser, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

function UserSidebar() {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/user/dashboard",
    },
    {
      name: "My Appointments",
      icon: <FiBook />,
      path: "/user/appointments",
    },
    {
      name: "Profile",
      icon: <FiUser />,
      path: "/user/profile",
    },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logged Out");

    navigate("/login");
  };

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
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition"
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}

export default UserSidebar;
