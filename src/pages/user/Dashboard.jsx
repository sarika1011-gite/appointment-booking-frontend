import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "../../components/admin/StatCard";
import SearchFilter from "../../components/user/SearchFilter";
import SlotCard from "../../components/user/SlotCard";
import UpcomingAppointment from "../../components/user/UpcomingAppointment";
import BookAppointmentModal from "../../components/user/BookAppointmentModal";
import toast from "react-hot-toast";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("");

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchSlots();
    fetchAppointments();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/availability");
      setSlots(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get(`/appointments/user/${user._id}`);
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredSlots = slots.filter((slot) => {
    const searchMatch = slot.providerId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const dayMatch = dayFilter === "" || slot.dayOfWeek === dayFilter;

    return searchMatch && dayMatch;
  });

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status !== "Cancelled",
  );

  return (
    <div>
      {/* User Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#5C4033]">User Dashboard 👋</h1>

        <p className="text-gray-500 mt-2">
          Welcome back, {user?.name}. Manage your appointments and available
          slots here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <StatCard
          title="Available Slots"
          value={slots.length}
          color="bg-[#708238]"
        />

        <StatCard
          title="Appointments"
          value={appointments.length}
          color="bg-[#8A6E45]"
        />

        <StatCard
          title="Confirmed"
          value={appointments.filter((a) => a.status === "Confirmed").length}
          color="bg-[#A1887F]"
        />

        <StatCard
          title="Pending"
          value={appointments.filter((a) => a.status === "Pending").length}
          color="bg-[#5C4033]"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {/* Upcoming Appointment */}
        <UpcomingAppointment appointments={upcomingAppointments} />

        {/* Search */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-[#5C4033] mb-5">
            Search Available Slots
          </h2>

          <SearchFilter
            search={search}
            setSearch={setSearch}
            dayFilter={dayFilter}
            setDayFilter={setDayFilter}
          />
        </div>
      </div>

      {/* Available Slots */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-[#5C4033] mb-6">
          Available Slots
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSlots.map((slot) => (
            <SlotCard
              key={slot._id}
              slot={slot}
              onBook={() => {
                setSelectedSlot(slot);
                setOpenModal(true);
              }}
            />
          ))}
        </div>
      </div>

      <BookAppointmentModal
        open={openModal}
        slot={selectedSlot}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          fetchAppointments();
          fetchSlots();
          toast.success("Appointment Booked");
        }}
      />
    </div>
  );
}

export default Dashboard;
