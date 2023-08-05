function FilterItem({ title, checked, setChecked }) {
  return (
    <div
      onClick={setChecked}
      className={
        (checked && "ring-2 ring-custom-purple") +
        " w-fit h-fit px-3 py-2  bg-custom-gray-base rounded-xl hover:cursor-pointer"
      }
    >
      {title}
    </div>
  );
}

export default FilterItem;
