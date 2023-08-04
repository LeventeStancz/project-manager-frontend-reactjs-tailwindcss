import { Outlet } from "react-router-dom";

import {
  HomeIcon,
  Square3Stack3DIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap">
      <Sidebar>
        <SidebarItem
          href="/"
          icon={<HomeIcon className="w-7 h-7" />}
          text={"Dashboard"}
        />
        <SidebarItem
          href="/project/recent"
          icon={<Square3Stack3DIcon className="w-7 h-7" />}
          text={"Project"}
        />
        <SidebarItem
          href="/invites"
          icon={<BellIcon className="w-7 h-7" />}
          text={"Invites"}
        />
        <SidebarItem
          href="/profile"
          icon={<UserIcon className="w-7 h-7" />}
          text={"Profile"}
        />
      </Sidebar>
      <Outlet />
    </div>
  );
}

export default MainLayout;
