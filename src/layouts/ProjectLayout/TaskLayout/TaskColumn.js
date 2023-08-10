import { Droppable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";

const TaskColumn = ({ loading, id, tasks }) => {
  if (tasks) {
    return (
      <div className=" w-full h-fit">
        {loading ? (
          <div className="w-full mt-10 flex flex-col items-center">loading</div>
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
                    <h1 className="text-xl text-custom-purple">
                      Nothing yet...
                    </h1>
                  ) : (
                    tasks.map((task, index) => {
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
      <div className="text-2xl text-custom-purple text-center">
        Nothing yet...
      </div>
    );
  }
};

export default TaskColumn;
