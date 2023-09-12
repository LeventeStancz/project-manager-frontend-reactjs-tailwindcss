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
    <div className=" w-fit flex flex-col items-center px-4">
      <Draggable draggableId={`${task?._id}`} key={task?._id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => setTaskModal((prev) => !prev)}
              className={
                (snapshot.isDragging &&
                  " outline outline-2 outline-custom-blue ") +
                " w-[360px] h-fit bg-custom-gray-base rounded-xl flex flex-row flex-nowrap hover:cursor-pointer"
              }
            >
              <div>
                <div className={bgColor() + " w-6 h-full rounded-l-xl"}></div>
              </div>
              <div className="h-full w-full flex flex-col p-3 gap-y-3">
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
              {provided.placeholder}
            </div>
          );
        }}
      </Draggable>
      {taskModal && (
        <TaskModal closeModal={() => setTaskModal(false)} task={task} />
      )}
    </div>
  );
};

export default TaskCard;
