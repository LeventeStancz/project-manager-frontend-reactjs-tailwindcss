import { Outlet } from "react-router-dom";

function ManageLayout() {
  return (
    <section className="w-full h-full flex flex-col p-5">
      <Outlet />
    </section>
  );
}

export default ManageLayout;
