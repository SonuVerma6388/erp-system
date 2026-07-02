import { FiPlus, FiSearch } from "react-icons/fi";

const CustomerToolbar = ({ search, setSearch, onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
      <div className="flex items-center gap-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-4 py-3">
        <FiSearch className="text-cyan-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Customer..."
          className="bg-transparent outline-none text-white"
        />
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-semibold">
        <FiPlus />
        Add Customer
      </button>
    </div>
  );
};

export default CustomerToolbar;
