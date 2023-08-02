import { HomeIcon } from "@heroicons/react/24/outline";

import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="h-screen w-full overflow-y-hidden overflow-x-hidden">
      <Sidebar>
        <SidebarItem
          icon={<HomeIcon className="w-8 h-8" />}
          text={"Dashboard"}
        />
      </Sidebar>
    </div>
  );
}

export default App;
