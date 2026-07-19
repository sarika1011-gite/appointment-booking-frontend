import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Videos from "../pages/admin/Videos";
import Availability from "../pages/admin/Availability";
import Appointments from "../pages/admin/Appointments";
import Profile from "../pages/admin/Profile";

// User Pages
import UserDashboard from "../pages/user/Dashboard";
import MyAppointments from "../pages/user/MyAppointments";
import UserProfile from "../pages/user/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="videos" element={<Videos />} />
          <Route path="availability" element={<Availability />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
