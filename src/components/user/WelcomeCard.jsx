function WelcomeCard({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-[#708238] to-[#5C4033] rounded-3xl p-8 text-white shadow-xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-3xl font-bold">
            {greeting},{" "}
            <span className="text-yellow-200">{user?.name || "User"}</span> 👋
          </h2>

          <p className="mt-3 text-white/90 text-lg">
            Welcome back to your appointment dashboard.
          </p>

          <p className="mt-2 text-white/80">📅 {today}</p>
        </div>

        <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center">
          <p className="text-sm text-white/80">Today's Tip 💡</p>

          <h3 className="mt-2 font-semibold">
            Book appointments early for better availability.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
