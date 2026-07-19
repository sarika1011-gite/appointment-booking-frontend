function UpcomingAppointment({ appointments }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-[#5C4033] mb-6">
        Upcoming Appointments 📅
      </h2>

      {appointments && appointments.length > 0 ? (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border rounded-2xl p-5 bg-[#FAF7F2]"
            >
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">📅 Date:</span>{" "}
                  {appointment.appointmentDate?.split("T")[0]}
                </p>

                <p>
                  <span className="font-semibold">⏰ Time:</span>{" "}
                  {appointment.startTime} - {appointment.endTime}
                </p>

                <p>
                  <span className="font-semibold">👤 Provider:</span>{" "}
                  {appointment.providerId?.name}
                </p>

                <p>
                  <span className="font-semibold">📝 Reason:</span>{" "}
                  {appointment.reason}
                </p>

                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No Upcoming Appointment
        </div>
      )}
    </div>
  );
}

export default UpcomingAppointment;
