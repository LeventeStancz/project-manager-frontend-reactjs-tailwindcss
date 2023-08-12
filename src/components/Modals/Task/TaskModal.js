import { XCircleIcon } from "@heroicons/react/24/outline";
import HorizontalLine from "../../Special/HorizontalLine";
import DateBox from "../../Special/DateBox";
import PriorityBox from "../../Special/PriorityBox";
import ReactDOM from "react-dom";

const TaskModal = ({ show, closeModal, task }) => {
  if (!show) return null;
  const handleOnClose = (e) => {
    if (e.target.id === "container") closeModal();
  };
  return ReactDOM.createPortal(
    <div
      id="container"
      onClick={handleOnClose}
      className="h-screen fixed top-0 w-full backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-8"
    >
      <div className="p-6 w-2/4 min-w-[800px] bg-custom-gray-base rounded-2xl overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="w-full flex items-center gap-x-4 text-lg">
            <h1 className="w-full text-3xl font-bold text-custom-blue">
              Details about the task:
            </h1>
            <div className="text-xl w-full flex justify-evenly">
              <DateBox date={task?.deadline} />
              <PriorityBox priority={task?.priority} />
            </div>
          </div>
          <p
            onClick={closeModal}
            className="text-2xl text-custom-red font-bold hover:cursor-pointer"
          >
            <XCircleIcon className="h-9 w-9" />
          </p>
        </div>
        <div className="w-full py-2 flex flex-col gap-y-4">
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Title:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            <h1 className="text-2xl px-1">{task?.title}</h1>
            <HorizontalLine />
          </div>
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Short description:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            <h2 className="text-xl px-1">{task?.shortDescription}</h2>
            <HorizontalLine />
          </div>
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Description:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            <h2 className="text-xl px-1 leading-relaxed">
              {task?.description
                ? task?.description
                : "No further information..."}
            </h2>
            <HorizontalLine />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modaldiv")
  );
};

export default TaskModal;
