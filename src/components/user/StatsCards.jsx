import { FiCalendar, FiCheckCircle, FiClock, FiLayers } from "react-icons/fi";

function StatsCards({ totalSlots, totalAppointments, confirmed, pending }) {
  const cards = [
    {
      title: "Available Slots",
      value: totalSlots,
      icon: <FiCalendar size={28} />,
      color: "bg-[#708238]",
    },
    {
      title: "My Appointments",
      value: totalAppointments,
      icon: <FiLayers size={28} />,
      color: "bg-[#8A6E45]",
    },
    {
      title: "Confirmed",
      value: confirmed,
      icon: <FiCheckCircle size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FiClock size={28} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-3xl p-6 shadow-xl hover:scale-105 duration-300`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/80">{card.title}</p>

              <h2 className="text-4xl font-bold mt-3">{card.value}</h2>
            </div>

            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
