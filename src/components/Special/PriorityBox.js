function PriorityBox({ priority }) {
  const textColor = () => {
    return priority === "low"
      ? "text-custom-purple"
      : priority === "normal"
      ? "text-custom-white"
      : "text-custom-red";
  };

  return (
    <div
      className={
        textColor() +
        " w-fit min-w-[60px] h-fit min-h-[30px] flex flex-nowrap justify-center items-center bg-custom-gray-light rounded-md px-2 py-1 space-x-2"
      }
    >
      <p>{priority || "none"}</p>
    </div>
  );
}

export default PriorityBox;
