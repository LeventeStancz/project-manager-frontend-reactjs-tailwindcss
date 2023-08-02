import {
  EllipsisVerticalIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ children }) {
  return (
    <aside className="h-full w-fit">
      <nav className="h-full flex flex-col bg-zinc-900 border-r border-zinc-700">
        <div className="p-4 pb-2 flex gap-x-4 justify-between items-center">
          <h1
            className={`text-4xl text-custom-orange font-bold overflow-hidden transition-all w-32`}
          >
            OTCGD
          </h1>
          <button className="p-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600">
            <ChevronDoubleLeftIcon className="text-zinc-100 w-7 h-7" />
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t border-zinc-600 flex p-3">
          <div className="w-10 h-10 rounded-md bg-custom-purple flex justify-center items-center">
            <h3 className="text-purple-900 font-bold text-2xl">JD</h3>
          </div>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
          >
            <div className="leading-4 truncate text-zinc-600 overflow-hidden">
              <h4 className="text-white font-semibold">Jhon Doe</h4>
              <span className="text-xs">jhondoe@gmail.com</span>
            </div>
            <button>
              <EllipsisVerticalIcon className="w-9 h-9" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
