import { useContext, createContext, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  EllipsisVerticalIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-full w-fit">
      <nav className="h-full flex flex-col bg-zinc-900 border-r border-zinc-700">
        <div className="p-4 flex flex-row gap-x-4 justify-between items-center">
          {expanded && (
            <h1
              className={`text-4xl text-custom-orange font-bold overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              OTCGD
            </h1>
          )}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 ring-2 ring-zinc-700 hover:ring-zinc-500 rounded-lg"
          >
            {expanded ? (
              <ChevronDoubleLeftIcon className="text-zinc-100 w-6 h-6" />
            ) : (
              <ChevronDoubleRightIcon className="text-zinc-100 w-6 h-6" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-zinc-600 flex p-3">
          <div className="w-10 h-10 rounded-md bg-custom-purple flex justify-center items-center">
            <h3 className="text-purple-900 font-bold text-2xl">JD</h3>
          </div>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-44 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 truncate text-zinc-600 overflow-hidden">
              <h4 className="text-white font-semibold">Jhon Doe</h4>
              <span className="text-xs">jhondoe@gmail.com</span>
            </div>
            <button>
              <EllipsisVerticalIcon className="w-9 h-9" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  href = "/",
  icon,
  text = "Unknown",
  alert = false,
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink to={href}>
      {({ isActive }) => {
        return (
          <li
            className={`
      
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          isActive
            ? " bg-gradient-to-tr from-zinc-700 to-zinc-600"
            : " hover:bg-zinc-700"
        }
    `}
          >
            {icon}
            <span
              className={`text-xl overflow-hidden transition-all ${
                expanded ? "w-fit ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded-full bg-custom-purple  ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-zinc-200 text-black text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                {text}
              </div>
            )}
          </li>
        );
      }}
    </NavLink>
  );
}
