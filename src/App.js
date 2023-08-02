import { HomeIcon } from "@heroicons/react/24/outline";

import Sidebar from "./components/Sidebar/Sidebar";
import SidebarItem from "./components/Sidebar/SidebarItem";

function App() {
  return (
    <div className="h-screen w-full overflow-y-hidden overflow-x-hidden">
      <Sidebar>
        <SidebarItem
          icon={<HomeIcon className="w-8 h-8" />}
          text={"Dashboard"}
          alert={true}
        />
      </Sidebar>
    </div>
  );
}

export default App;
