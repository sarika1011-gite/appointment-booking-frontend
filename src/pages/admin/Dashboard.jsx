import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalVideos: 0,
    totalSlots: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#5C4033]">
          Admin Dashboard 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage users, appointments, availability and platform activity from
          one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          color="bg-[#708238]"
        />

        <StatCard
          title="Total Videos"
          value={stats.totalVideos}
          color="bg-[#8A6E45]"
        />

        <StatCard
          title="Available Slots"
          value={stats.totalSlots}
          color="bg-[#A1887F]"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="bg-[#5C4033]"
        />
      </div>

      <p>✅ New user registered</p>

      <p>📅 Appointment booked</p>

      <p>🎬 Video module updated</p>

      <p>👤 User module completed</p>
    </div>
  );
}

export default Dashboard;
