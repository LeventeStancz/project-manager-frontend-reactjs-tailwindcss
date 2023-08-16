import { useState } from "react";

import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const SearchSelector = ({
  inputValue,
  setInputValue,
  setSelectedId,
  data,
  placeholder,
  inputPlaceholder,
}) => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-72 font-medium h-fit flex flex-col gap-y-1">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-custom-gray-base w-full p-2 flex items-center justify-between rounded-xl ring-2 ring-zinc-500 ${
          !selected && "text-gray-400"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : placeholder}
        <ChevronDownIcon className={`${open && "rotate-180"} w-8 h-8`} />
      </div>
      <ul
        className={`rounded-xl w-full bg-custom-gray-base overflow-y-auto ${
          open ? " max-h-60" : " max-h-0"
        } `}
      >
        <div className="flex items-center px-2 py-1 sticky top-0 bg-custom-gray-base">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
            className="placeholder:text-gray-400 w-full p-2 outline-none bg-custom-gray-base ring-0 border-0 focus:outline-0 focus:ring-0"
          />
        </div>
        {data?.map((obj) => (
          <li
            key={obj?._id}
            className={`p-2 hover:bg-sky-600 hover:text-white
              ${
                obj?.name?.toLowerCase() === selected?.toLowerCase() &&
                " bg-sky-600 text-white"
              }
              "block"`}
            onClick={() => {
              if (obj?.name?.toLowerCase() !== selected?.toLowerCase()) {
                setSelected(obj?.name);
                setOpen(false);
                setInputValue("");
                setSelectedId(obj?._id);
              }
            }}
          >
            {obj?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSelector;
