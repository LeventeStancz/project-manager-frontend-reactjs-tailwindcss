import { Outlet } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/24/outline";
import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap">
      <Sidebar>
        <SidebarItem
          icon={<HomeIcon className="w-8 h-8" />}
          text={"Dashboard"}
        />
      </Sidebar>
      <Outlet />
    </div>
  );
}

export default MainLayout;
