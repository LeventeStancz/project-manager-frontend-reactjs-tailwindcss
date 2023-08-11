import { Draggable } from "react-beautiful-dnd";
import DateBox from "../../../components/Special/DateBox";
import PriorityBox from "../../../components/Special/PriorityBox";
import TaskModal from "../../../components/Modals/Task/TaskModal";
import { useState } from "react";

const TaskCard = ({ task, index }) => {
  const [taskModal, setTaskModal] = useState(false);

  const bgColor = () => {
    return task.status === "todo"
      ? "bg-custom-gray-light"
      : task.status === "inprogress"
      ? "bg-custom-yellow-card"
      : "bg-custom-green";
  };

  return (
    <Draggable draggableId={`${task?._id}`} key={task?._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className=" w-full flex flex-col items-center px-4 hover:cursor-pointer"
          >
            <div
              onClick={() => setTaskModal((prev) => !prev)}
              className={
                (snapshot.isDragging &&
                  " outline outline-2 outline-custom-blue ") +
                " min-w-[240px] w-full max-w-[360px] min-h-[120px] h-fit max-h-[180px] bg-custom-gray-base rounded-xl flex flex-row flex-nowrap"
              }
            >
              <div>
                <div className={bgColor() + " w-6 h-full rounded-l-xl"}></div>
              </div>
              <div className="w-full flex flex-col p-3 gap-y-3">
                <div className="w-full flex flex-col gap-y-2 justify-center">
                  <h1 className="text-xl font-semibold">{task.title}</h1>
                  <h2 className="text-custom-gray-bright font-medium">
                    {task?.shortDescription}
                  </h2>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <DateBox date={task?.deadline} />
                  <PriorityBox priority={task?.priority} />
                </div>
              </div>
            </div>
            <TaskModal
              show={taskModal}
              closeModal={() => setTaskModal(false)}
              task={task}
            />
            {provided.placeholder}
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
