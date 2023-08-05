import { ClockIcon } from "@heroicons/react/24/outline";

function DateBox({ date }) {
  return (
    <div className="w-fit min-w-[60px] h-fit min-h-[30px] flex flex-nowrap justify-center items-center bg-custom-gray-light rounded-md px-2 py-1 space-x-2">
      <ClockIcon className="w-6 h-6" />
      <p>{date || "0000.00.00."}</p>
    </div>
  );
}

export default DateBox;
