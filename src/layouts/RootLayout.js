import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="h-screen max-h-screen w-full min-w-[1400px] overflow-y-hidden overflow-x-hidden">
      <Outlet />
    </main>
  );
}

export default RootLayout;
