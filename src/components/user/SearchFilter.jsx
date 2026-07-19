import { FiSearch } from "react-icons/fi";

function SearchFilter({ search, setSearch, dayFilter, setDayFilter }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mt-8 flex flex-col md:flex-row gap-4">
      <div className="flex items-center flex-1 border rounded-xl px-4">
        <FiSearch className="text-gray-500" />

        <input
          type="text"
          placeholder="Search provider..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 outline-none"
        />
      </div>

      <select
        value={dayFilter}
        onChange={(e) => setDayFilter(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Days</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>
    </div>
  );
}

export default SearchFilter;
