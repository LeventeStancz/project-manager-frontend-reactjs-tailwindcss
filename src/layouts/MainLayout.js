import { Outlet } from "react-router-dom";

import { SidebarProvider } from "../contexts/SidebarProvider";

import {
  HomeIcon,
  Square3Stack3DIcon,
  BellIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Sidebar, { SidebarItem } from "../components/Sidebar/Sidebar";
import DropDown from "../components/Sidebar/DropDown";

import useIsAdmin from "../hooks/useIsAdmin";

function MainLayout() {
  const { isAdmin } = useIsAdmin();
  return (
    <div className="h-full w-full flex flex-row flex-nowrap">
      <SidebarProvider>
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
          {isAdmin && (
            <DropDown>
              <SidebarItem
                href="/manage/projects"
                icon={<WrenchScrewdriverIcon className="w-6 h-6" />}
                text={"Projects"}
              />
            </DropDown>
          )}
          {/*<div className="w-full overflow-y-scroll">
            <div className="w-full flex flex-col space-y-20">
              <p>Favorite item</p>
              <p>Favorite item</p>
              <p>Favorite item</p>
              <p>Favorite item</p>
              <p>Favorite item</p>
              <p>Favorite item</p>
            </div>
          </div>*/}
        </Sidebar>
      </SidebarProvider>
      <Outlet />
    </div>
  );
}

export default MainLayout;
