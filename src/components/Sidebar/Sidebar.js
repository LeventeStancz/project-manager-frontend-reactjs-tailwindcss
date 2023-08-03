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
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-zinc-900 ring-1 ring-zinc-700">
        <div
          className={`p-4 flex flex-row  
           justify-between
         items-center`}
        >
          <h1
            className={`text-3xl text-custom-orange font-bold overflow-hidden transition-all duration-500 ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            OTCGD
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`relative group p-1.5 ${
              !expanded && "mr-1"
            } rounded-lg ring-2 ring-slate-700 hover:ring-slate-600`}
          >
            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-slate-600 text-slate-300 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-500
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                Open
              </div>
            )}
            {expanded ? (
              <ChevronDoubleLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronDoubleRightIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <div className="flex-1 px-3 flex flex-col gap-y-2">{children}</div>
        </SidebarContext.Provider>

        <div className="ring-1 ring-zinc-700 flex p-3">
          <div
            className={`w-10 h-10 ${
              !expanded && "ml-1"
            } rounded-md flex justify-center items-center bg-custom-purple`}
          >
            <h4 className="font-bold text-xl text-purple-800">JD</h4>
          </div>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-500 ${
                expanded ? "w-44 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <EllipsisVerticalIcon className="w-8 h-8" />
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
          <div
            className={`
      
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group duration-500
        ${isActive ? " bg-slate-800" : " hover:bg-slate-600"}
    `}
          >
            {icon}
            <span
              className={`
              overflow-hidden transition-all duration-500 ${
                expanded ? "w-32 ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-slate-600 text-slate-300 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-500
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                {text}
              </div>
            )}
          </div>
        );
      }}
    </NavLink>
  );
}
