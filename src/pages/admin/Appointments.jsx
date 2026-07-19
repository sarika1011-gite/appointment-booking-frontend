import { useEffect, useState } from "react";
import { FiSearch, FiCheck, FiX } from "react-icons/fi";
import api from "../../services/api";
import toast from "react-hot-toast";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load appointments");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });

      toast.success(`Appointment ${status}`);

      fetchAppointments();
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error("Update Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#5C4033]">Appointments</h1>

          <p className="text-gray-500 mt-2">Manage all customer bookings.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-5 flex items-center">
        <FiSearch className="text-gray-500 text-xl" />

        <input
          type="text"
          placeholder="Search appointment..."
          className="ml-3 w-full outline-none"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#5C4033] text-white">
            <tr>
              <th className="p-4">Client</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr
                key={item._id}
                className="text-center border-b hover:bg-[#F6F1E9]"
              >
                <td className="p-4">{item.userId?.name}</td>

                <td>{item.appointmentDate?.split("T")[0]}</td>

                <td>
                  {item.startTime} - {item.endTime}
                </td>

                <td>{item.reason}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => updateStatus(item._id, "Confirmed")}
                    className="text-green-600 mr-3 hover:text-green-800"
                  >
                    <FiCheck />
                  </button>

                  <button
                    onClick={() => updateStatus(item._id, "Cancelled")}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiX />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
