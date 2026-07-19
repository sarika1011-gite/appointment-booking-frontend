import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function Availability() {
  const [slots, setSlots] = useState([]);

  const [formData, setFormData] = useState({
    providerId: JSON.parse(localStorage.getItem("user"))?._id || "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    slotDuration: 30,
    isAvailable: true,
  });
  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this slot?")) return;

    try {
      await api.delete(`/availability/${id}`);

      toast.success("Slot Deleted Successfully");

      fetchSlots();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/availability");
      setSlots(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load slots");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addSlot = async () => {
    try {
      await api.post("/availability", formData);

      toast.success("Slot Added Successfully");

      fetchSlots();

      setFormData({
        ...formData,
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        slotDuration: 30,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#5C4033]">Availability</h1>

          <p className="text-gray-500 mt-2">Manage weekly available slots.</p>
        </div>

        <button className="bg-[#708238] text-white px-6 py-3 rounded-xl">
          <FiPlus className="inline mr-2" />
          Add Slot
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 grid md:grid-cols-5 gap-4">
        <select
          name="dayOfWeek"
          value={formData.dayOfWeek}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="slotDuration"
          value={formData.slotDuration}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button
          onClick={addSlot}
          className="bg-[#708238] text-white rounded-lg"
        >
          Save Slot
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#5C4033] text-white">
            <tr>
              <th className="p-4">Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {slots.map((item) => (
              <tr
                key={item._id}
                className="text-center border-b hover:bg-[#F6F1E9]"
              >
                <td className="p-4">{item.dayOfWeek}</td>

                <td>{item.startTime}</td>

                <td>{item.endTime}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      item.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => deleteSlot(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
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

export default Availability;
