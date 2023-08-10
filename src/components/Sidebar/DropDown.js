import { useEffect, useState } from "react";
import {
  Cog6ToothIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";

import useSidebar from "../../hooks/useSidebar";

function DropDown({ children }) {
  const { expanded, setExpanded } = useSidebar();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened === true && expanded === false) {
      setOpened(false);
    }
  }, [opened, setOpened, expanded, setExpanded]);

  return (
    <>
      <div
        onClick={() => {
          if (expanded === false) {
            setExpanded(true);
          }
          setOpened((prev) => !prev);
        }}
        className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group duration-300 hover:bg-slate-600"
      >
        <Cog6ToothIcon className="w-7 h-7" />
        <span
          className={`
          overflow-hidden transition-all duration-300 ${
            expanded ? "w-32 ml-3" : "w-0"
          }`}
        >
          Manage
        </span>

        <ArrowDownCircleIcon
          className={
            (opened && "rotate-180 ") +
            "transition-all duration-300 w-7 h-7 " +
            (!expanded && "hidden")
          }
        />

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-slate-600 text-slate-300 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-300
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            Manage
          </div>
        )}
      </div>
      {opened && <div className="px-3 flex flex-col gap-y-2">{children}</div>}
    </>
  );
}

export default DropDown;
