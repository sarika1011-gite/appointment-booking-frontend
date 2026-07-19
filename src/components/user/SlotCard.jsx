import { FiCalendar, FiClock, FiUser, FiArrowRight } from "react-icons/fi";

function SlotCard({ slot, onBook }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#5C4033] text-white p-5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{slot.dayOfWeek}</h2>
          <p className="text-sm text-gray-200 mt-1">Weekly Availability</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            slot.isAvailable
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {slot.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FiClock className="text-[#708238] text-xl flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-semibold">
                {slot.startTime} - {slot.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiCalendar className="text-[#708238] text-xl flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold">{slot.slotDuration} Minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiUser className="text-[#708238] text-xl flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Provider</p>
              <p className="font-semibold">
                {slot.providerId?.name || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0">
        <button
          disabled={!slot.isAvailable}
          onClick={() => onBook(slot)}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
            slot.isAvailable
              ? "bg-[#708238] hover:bg-[#5C4033] text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Book Appointment
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}

export default SlotCard;
