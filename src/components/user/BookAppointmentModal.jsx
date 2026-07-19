import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function BookAppointmentModal({ open, onClose, slot, onSuccess }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [reason, setReason] = useState("");

  if (!open || !slot) return null;

  const handleSubmit = async () => {
    try {
      await api.post("/appointments", {
        userId: user._id,
        providerId: slot.providerId._id,
        appointmentDate: new Date(),
        startTime: slot.startTime,
        endTime: slot.endTime,
        reason,
      });

      toast.success("Appointment Booked Successfully");

      onSuccess();

      onClose();

      setReason("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-[#5C4033]">Book Appointment</h2>

        <div className="mt-6 space-y-4">
          <div>
            <label className="font-semibold">Provider</label>

            <input
              disabled
              value={slot.providerId?.name}
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Day</label>

            <input
              disabled
              value={slot.dayOfWeek}
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Time</label>

            <input
              disabled
              value={`${slot.startTime} - ${slot.endTime}`}
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Reason</label>

            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
              placeholder="Enter booking reason..."
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="flex-1 border rounded-xl py-3">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#708238] hover:bg-[#5C4033] text-white rounded-xl py-3"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookAppointmentModal;
