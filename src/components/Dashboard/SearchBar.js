import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Searchbar({
  query,
  setQuery,
  fit = false,
  width,
  placeholder,
  popup,
}) {
  return (
    <div
      className={
        (fit ? "w-fit " : width ? `w-${width} ` : "w-full ") +
        " min-w-[320px] h-fit flex flex-col"
      }
    >
      <div className="relative group w-full h-12 bg-custom-gray-base text-custom-gray-bright rounded-2xl px-3 flex flex-nowrap items-center">
        <MagnifyingGlassIcon className="w-6 h-6 text-custom-purple" />
        <input
          type="text"
          id="params"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          maxLength="32"
          placeholder={placeholder}
          className="w-full h-full px-2 bg-custom-gray-base border-0 text-white placeholder-custom-gray-bright rounded-lg focus:outline-none focus:ring-0 focus:border-0"
        />
        <div
          className={`
          absolute top-full right-0 w-full rounded-md px-2 py-1 ml-6
          bg-slate-600 text-slate-300 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-300
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {popup}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
