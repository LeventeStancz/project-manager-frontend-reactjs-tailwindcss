function SidebarItem({
  icon,
  text = "unknown",
  active = false,
  alert = false,
}) {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-2
  font-medium rounded-md cursor-pointer
  transition-colors group  ${active ? "bg-zinc-700" : "hover:bg-zinc-700"}`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all 
          w-fit ml-3 text-lg
        `}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-custom-purple
            top-2
          `}
        />
      )}

      {true && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default SidebarItem;
