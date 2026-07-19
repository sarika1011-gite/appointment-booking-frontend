import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";

function UserLayout() {
  return (
    <div className="flex min-h-screen bg-[#F6F1E9]">
      <UserSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
