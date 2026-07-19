import { useEffect, useState } from "react";
import { FiSearch, FiX, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import api from "../../services/api";
import toast from "react-hot-toast";

function MyAppointments() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get(`/appointments/user/${user._id}`);
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load appointments");
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await api.put(`/appointments/${id}/cancel`);

      toast.success("Appointment Cancelled");

      fetchAppointments();
    } catch (error) {
      console.log(error);
      toast.error("Cancel Failed");
    }
  };

  const filteredAppointments = appointments.filter((item) => {
    const matchSearch =
      item.reason.toLowerCase().includes(search.toLowerCase()) ||
      item.providerId?.name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;

  const pending = appointments.filter((a) => a.status === "Pending").length;

  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;

  return (
    <div className="min-h-screen bg-[#F6F1E9] p-4 md:p-8">
      <h1 className="text-4xl font-bold text-[#5C4033]">My Appointments</h1>

      <p className="text-gray-500 mt-2">Manage all your bookings.</p>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-[#708238]">
            {appointments.length}
          </h2>
          <p>Total</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-green-600">{confirmed}</h2>
          <p>Confirmed</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-yellow-600">{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-red-600">{cancelled}</h2>
          <p>Cancelled</p>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-5 flex flex-col lg:flex-row gap-4">
        <div className="flex items-center flex-1">
          <FiSearch className="text-xl text-gray-500" />

          <input
            type="text"
            placeholder="Search provider or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Cards */}

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-10 mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-500">
            No Appointments Found
          </h2>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {filteredAppointments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all"
            >
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-[#5C4033]">
                  {item.providerId?.name}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    item.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="space-y-3 mt-5">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-[#708238]" />
                  {item.appointmentDate.split("T")[0]}
                </div>

                <div className="flex items-center gap-3">
                  <FiClock className="text-[#708238]" />
                  {item.startTime} - {item.endTime}
                </div>

                <div className="flex items-center gap-3">
                  <FiUser className="text-[#708238]" />
                  {item.reason}
                </div>
              </div>

              {item.status !== "Cancelled" && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex justify-center items-center gap-2"
                >
                  <FiX />
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
