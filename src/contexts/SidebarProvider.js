import { createContext, useState } from "react";

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
