function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${color}`}
      >
        {value}
      </div>

      <h3 className="mt-5 text-center text-base font-semibold text-[#5C4033] break-words leading-6 px-2">
        {title}
      </h3>
    </div>
  );
}

export default StatCard;
