import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalVideos: 0,
    totalSlots: 0,
    totalUsers: 0,
    recentVideos: [],
    recentUsers: [],
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
    <div className="space-y-8">
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
      <div className="grid md:grid-cols-4 gap-6">
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

      {/* Dashboard Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Videos */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-[#5C4033] mb-5">
            🎬 Recent Videos
          </h2>

          {stats.recentVideos?.length > 0 ? (
            <div className="space-y-4">
              {stats.recentVideos.map((video) => (
                <div
                  key={video._id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <h3 className="font-semibold text-[#5C4033]">
                      {video.title}
                    </h3>

                    <p className="text-sm text-gray-500">{video.category}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      video.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : video.status === "Editing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {video.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No videos available.</p>
          )}
        </div>

        {/* Registered Users */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-[#5C4033] mb-5">
            👥 Registered Users
          </h2>

          {stats.recentUsers?.length > 0 ? (
            <div className="space-y-4">
              {stats.recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#708238] text-white flex items-center justify-center font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#5C4033]">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-[#EFE6DD] text-[#5C4033] capitalize">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
