import { FiSearch } from "react-icons/fi";

const ProductSearch = ({ search = "", setSearch = () => {} }) => {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        bg-slate-900

        border
        border-cyan-500/20

        rounded-2xl

        px-4
        py-3
      ">
      <FiSearch className="text-cyan-400" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search product..."
        className="
          flex-1
          bg-transparent
          outline-none
          text-white
        "
      />
    </div>
  );
};

export default ProductSearch;
