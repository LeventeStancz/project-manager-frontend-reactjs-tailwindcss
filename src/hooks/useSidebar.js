import { useContext } from "react";
import SidebarContext from "../contexts/SidebarProvider";

const useSidebar = () => {
  return useContext(SidebarContext);
};

export default useSidebar;
