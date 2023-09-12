import { XCircleIcon } from "@heroicons/react/24/outline";
import DateBox from "../../Special/DateBox";
import PriorityBox from "../../Special/PriorityBox";
import ReactDOM from "react-dom";

import TaskModalBody from "./TaskModalBody";
import TaskModalFormBody from "./TaskModalFormBody";

import useIsAdmin from "../../../hooks/useIsAdmin";
import useIsOwner from "../../../hooks/useIsOwner";
import { useState } from "react";

const TaskModal = ({ closeModal, task }) => {
  const { isAdmin } = useIsAdmin();
  const { isOwner } = useIsOwner(task.project);

  const [editing, setEditing] = useState(false);

  const handleOnClose = (e) => {
    if (e.target.id === "container") closeModal();
  };

  return ReactDOM.createPortal(
    <div
      id="container"
      onClick={handleOnClose}
      className="h-screen fixed top-0 w-full backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-8"
    >
      <div className="relative p-6 w-2/4 min-w-[800px] bg-custom-gray-base rounded-2xl overflow-y-auto overflow-x-hidden">
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
        {(isAdmin || isOwner) && (
          <div
            onClick={() => setEditing((prev) => !prev)}
            className="absolute right-6 w-fit px-3 py-2 rounded-xl text-xl text-black font-semibold bg-custom-yellow-card cursor-pointer hover:bg-custom-yellow-base"
          >
            {editing ? "Back" : "Edit this task"}
          </div>
        )}
        {editing ? (
          <TaskModalFormBody task={task} closeModal={closeModal} />
        ) : (
          <TaskModalBody task={task} />
        )}
      </div>
    </div>,
    document.getElementById("modaldiv")
  );
};

export default TaskModal;
