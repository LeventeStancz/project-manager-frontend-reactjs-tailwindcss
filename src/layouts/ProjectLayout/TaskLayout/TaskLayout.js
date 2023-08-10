import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import useAxiosGetFetch from "../../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import TaskColumn from "./TaskColumn";
import HorizontalLine from "../../../components/Special/HorizontalLine";
import VerticalLine from "../../../components/Special/VerticalLine";

function TaskLayout() {
  const axiosPrivate = useAxiosPrivate();
  const { projectname } = useParams();
  const [query, setQuery] = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [inprogs, setInprogs] = useState([]);
  const [dones, setDones] = useState([]);

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/tasks/${projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setTodos(data?.todos);
      setInprogs(data?.inprogs);
      setDones(data?.dones);
    }
  }, [data]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    try {
      await axiosPrivate.patch(
        `/tasks/update/status/${projectname}/${draggableId}`,
        JSON.stringify({
          status: destination.droppableId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error) {
      if (!error.response?.data?.clientMsg || !error.response?.data?.error) {
        console.log("Server offline. Try again later.");
      } else {
        console.log(error.response.data.clientMsg);
        console.log(error.response.data.error);
      }
    }
    setRefetch((prev) => !prev);
  };

  return loading ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      loading
    </div>
  ) : (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex flex-row justify-between overflow-y-hidden overflow-x-hidden">
        <div className="w-full h-full flex flex-col">
          <div>
            <div className="w-full text-[1.7rem] font-semibold text-center p-1">
              To do
            </div>
            <HorizontalLine />
          </div>
          <div className="p-2 w-full overflow-y-scroll overflow-x-hidden no-scrollbar">
            <TaskColumn id={"todo"} tasks={todos} />
          </div>
        </div>
        <VerticalLine />
        <div className="w-full h-full flex flex-col">
          <div>
            <div className="w-full text-[1.7rem] font-semibold text-center p-1">
              In progress
            </div>
            <HorizontalLine />
          </div>
          <div className="p-2 w-full overflow-y-scroll overflow-x-hidden no-scrollbar">
            <TaskColumn id={"inprogress"} tasks={inprogs} />
          </div>
        </div>
        <VerticalLine />
        <div className="w-full h-full flex flex-col">
          <div>
            <div className="w-full text-[1.7rem] font-semibold text-center p-1">
              Done
            </div>
            <HorizontalLine />
          </div>
          <div className="p-2 w-full overflow-y-scroll overflow-x-hidden no-scrollbar">
            <TaskColumn id={"done"} tasks={dones} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default TaskLayout;
