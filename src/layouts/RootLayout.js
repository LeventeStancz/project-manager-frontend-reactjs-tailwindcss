import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="h-screen max-h-screen w-full overflow-y-hidden overflow-x-hidden">
      <Outlet />
    </main>
  );
}

export default RootLayout;
