import { XCircleIcon } from "@heroicons/react/24/outline";
import HorizontalLine from "../../Special/HorizontalLine";
import DateBox from "../../Special/DateBox";
import PriorityBox from "../../Special/PriorityBox";
import ReactDOM from "react-dom";

const TaskModal = ({ show, closeModal, task }) => {
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className="overflow-y-scroll overflow-x-hidden">
      <div
        onClick={closeModal}
        className="h-screen w-full fixed top-0 backdrop-blur-sm"
      ></div>
      <div className="h-fit w-fit fixed top-20 left-1/2 -translate-x-1/2 z-50 flex justify-center items-start">
        <div className="w-fit min-w-[740px] max-h-full p-6 z-50 bg-custom-gray-base rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-full flex items-center gap-x-4 text-lg">
              <h1 className="w-full text-3xl font-bold text-custom-blue">
                Details about the task:
              </h1>
              <div className="w-full flex justify-evenly">
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
          <div className="w-full py-2 flex flex-col gap-y-3">
            <h1 className="text-2xl px-1">{task?.title}</h1>
            <HorizontalLine />
            <h2 className="text-xl px-1">{task?.shortDescription}</h2>
            <HorizontalLine />
            <h2 className="text-xl px-1">
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
