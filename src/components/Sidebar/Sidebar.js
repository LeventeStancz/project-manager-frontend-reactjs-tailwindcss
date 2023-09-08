import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import HorizontalLine from "../Special/HorizontalLine";

import useLogout from "../../hooks/useLogout";
import useSidebar from "../../hooks/useSidebar";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";

export default function Sidebar({ children }) {
  const [user, setUser] = useState({});
  const { expanded, setExpanded } = useSidebar();
  const logout = useLogout();

  const { data, loading, fetchError } = useAxiosGetFetch(`/users`);

  useEffect(() => {
    if (!fetchError && data != null) {
      setUser(data.user);
    }
  }, [data]);

  return (
    <aside className="h-full max-h-screen">
      <nav className="h-full flex flex-col bg-custom-black border-r border-custom-gray-dark">
        <div className="p-4 flex flex-row justify-between items-center">
          <h1
            className={`text-3xl text-custom-orange font-bold overflow-hidden transition-all duration-300 ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            OTCGD
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`p-1.5 ${
              !expanded && "mr-1"
            } relative group rounded-lg ring-2 ring-slate-700 hover:ring-slate-400`}
          >
            <div
              className={`
            absolute left-full rounded-md px-2 py-1 ml-7
           bg-slate-600 text-slate-300 text-sm
            invisible opacity-20 -translate-x-3 transition-all duration-300
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
            >
              {expanded ? "Close" : "Open"}
            </div>
            {expanded ? (
              <ChevronDoubleLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronDoubleRightIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="px-3 flex flex-col gap-y-2">{children}</div>
        <div className="flex-1"></div>
        {/*<div
          className={`${
            expanded ? "w-full" : "w-0"
          } transition-all duration-300 pt-4 h-full max-h-full overflow-y-hidden overflow-x-hidden flex flex-col`}
        >
          <HorizontalLine />
          <p className="pl-4 pt-4 pb-2 text-lg font-semibold text-custom-purple truncate">
            Favorites
          </p>
          <div className="py-1 flex-1 overflow-y-scroll">
            <div className="px-8 flex flex-col gap-y-3">
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
              <p className="truncate">Favorite</p>
            </div>
          </div>
        </div>*/}
        <div className="border-t border-custom-gray-light flex justify-center items-center p-3">
          <div className="relative group">
            {!expanded && (
              <div
                className={`
          absolute left-10 rounded-md px-2 py-1 ml-6
          bg-slate-600 text-slate-300 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-300
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                Logout
              </div>
            )}
            <ArrowRightOnRectangleIcon
              onClick={logout}
              className="w-8 h-8 text-slate-400 hover:cursor-pointer"
            />
          </div>
          <div
            className={`
              flex items-center
              overflow-hidden transition-all duration-300 ${
                expanded ? "w-44 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4 truncate text-custom-gray-bright">
              <NavLink to="/profile">
                <h4 className="font-semibold truncate text-white hover:underline hover:cursor-pointer">
                  {loading ? <Skeleton width={100} /> : user?.username}
                </h4>
              </NavLink>
              <span className="text-xs">
                {loading ? <Skeleton width={140} /> : user?.email}
              </span>
            </div>
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
  const { expanded } = useSidebar();

  return (
    <NavLink to={href}>
      {({ isActive }) => {
        return (
          <div
            className={`
        relative flex items-center py-2 px-3.5 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group duration-300
        ${isActive ? " bg-slate-800" : " hover:bg-slate-600"}
    `}
          >
            {icon}
            <span
              className={`
              overflow-hidden transition-all duration-300 ${
                expanded ? "w-32 ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-custom-purple ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-slate-600 text-slate-300 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-300
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
