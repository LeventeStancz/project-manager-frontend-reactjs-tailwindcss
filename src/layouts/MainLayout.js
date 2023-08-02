import { Outlet } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/24/outline";
import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap px-2 py-3 gap-x-3">
      <Sidebar>
        <SidebarItem
          href="/"
          icon={<HomeIcon className="w-7 h-7" />}
          text={"Dashboard"}
        />
      </Sidebar>
      <Outlet />
    </div>
  );
}

export default MainLayout;
