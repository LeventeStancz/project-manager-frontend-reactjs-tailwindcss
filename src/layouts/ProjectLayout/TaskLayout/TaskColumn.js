import { Droppable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";
import TaskCardSkeleton from "../../../components/Skeletons/TaskCardSkeleton";

var order = {
  low: 0,
  normal: 1,
  high: 2,
};

const TaskColumn = ({ loading, id, tasks }) => {
  if (tasks) {
    return (
      <div className=" w-full h-fit">
        {loading ? (
          <div className="w-full py-6 flex flex-col items-center gap-y-8">
            <TaskCardSkeleton />
          </div>
        ) : (
          <Droppable droppableId={id}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    (snapshot.isDraggingOver &&
                      "outline-2 outline-dashed outline-custom-purple ") +
                    " w-full py-6 flex flex-col items-center gap-y-8"
                  }
                >
                  {tasks.length === 0 ? (
                    <h1 className="text-2xl text-custom-purple text-center">
                      Nothing yet...
                    </h1>
                  ) : (
                    tasks
                      .sort((a, b) => {
                        return new Date(a.deadline) - new Date(b.deadline);
                      })
                      .sort((a, b) => {
                        return order[b.priority] - order[a.priority];
                      })
                      .map((task, index) => {
                        return (
                          <TaskCard key={task?._id} index={index} task={task} />
                        );
                      })
                  )}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        )}
      </div>
    );
  } else {
    return (
      <h1 className="text-2xl text-custom-purple text-center">
        Nothing yet...
      </h1>
    );
  }
};

export default TaskColumn;
