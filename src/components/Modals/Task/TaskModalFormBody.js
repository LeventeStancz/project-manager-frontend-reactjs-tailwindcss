import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import HorizontalLine from "../../Special/HorizontalLine";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAxiosGetFetch from "../../../hooks/useAxiosGetFetch";

function TaskModalFormBody({ task, closeModal }) {
  const axiosPrivate = useAxiosPrivate();
  const { projectname } = useParams();
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [deadlineCB, setDeadlineCB] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("normal");
  const [clientMsg, setClientMsg] = useState("");

  useEffect(() => {
    setTitle(task?.title);
    setShortDesc(task?.shortDescription);
    setDesc(task?.description);
    setDeadlineCB(task?.deadline ? true : false);
    if (task?.deadline) {
      setDeadline(task?.deadline);
    }
    setAssignedTo(task?.assignedTo);
    setStatus(task?.status);
    setPriority(task?.priority);
  }, []);

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/members/${projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setUsers(data?.users);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      const response = await axiosPrivate.put(
        `/tasks/update/${projectname}/${task?._id}`,
        JSON.stringify({
          title,
          shortDescription: shortDesc,
          description: desc,
          deadline: deadlineCB ? deadline : "undefined",
          assignedTo,
          status,
          priority,
        })
      );

      setClientMsg(response?.data?.clientMsg);
      setTimeout(() => {
        closeModal();
      }, 2000); //2sec
    } catch (error) {
      if (!error.response?.data?.clientMsg || !error.response?.data?.error) {
        setClientMsg("Server offline. Try again later.");
      } else {
        setClientMsg(error.response.data.clientMsg);
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <div className="w-full py-2 flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold px-1 text-custom-purple">Title:</h1>
      <div className="flex flex-col gap-y-2">
        <HorizontalLine />
        <input
          type="text"
          id="subject"
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength="32"
          required
          className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
        />
        <HorizontalLine />
      </div>
      <h1 className="text-2xl font-semibold px-1 text-custom-purple">
        Short description:
      </h1>
      <div className="flex flex-col gap-y-2">
        <HorizontalLine />
        <textarea
          type="text"
          id="Description"
          autoComplete="off"
          onChange={(e) => setShortDesc(e.target.value)}
          value={shortDesc}
          maxLength="128"
          required
          className="w-full h-fit resize-none text-left py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
        ></textarea>
        <HorizontalLine />
      </div>
      <h1 className="text-2xl font-semibold px-1 text-custom-purple">
        Description:
      </h1>
      <div className="flex flex-col gap-y-2">
        <HorizontalLine />
        <textarea
          type="text"
          id="Description"
          autoComplete="off"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="w-full h-10 max-h-80 text-left py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
        ></textarea>
        <HorizontalLine />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="w-full py-2 flex flex-row justify-between items-center flex-nowrap">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">Status</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-40 bg-custom-gray-base rounded-lg ring-1 ring-zinc-500 focus:ring-2 focus:ring-custompurple focus:outline-none border-0"
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">Priority</h2>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-40 bg-custom-gray-base rounded-lg ring-1 ring-zinc-500 focus:ring-2 focus:ring-custom-purple focus:outline-none border-0"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <HorizontalLine />
        <div className="w-full py-2 falex flex-row justify-between items-center flex-nowrap">
          <div>
            <h2 className="pl-2 text-lg hover:cursor-pointer">Assigned to?</h2>
          </div>
          <div>
            {loading ? (
              <Skeleton width={280} height={40} />
            ) : (
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-72 bg-custom-gray-base rounded-lg ring-1 ring-zinc-500 focus:ring-2 focus:ring-custom-purple focus:outline-none border-0"
              >
                {users.map((user) => {
                  return (
                    <option key={user?._id} value={user?._id}>
                      {(user?.isOwner ? "#Owner - " : "") + user?.username}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
        <HorizontalLine />
        <div className="flex flex-nowrap items-center justify-between">
          <div className="flex flex-nowrap gap-x-4 py-2 items-center">
            <label
              htmlFor="deadline"
              className="pl-2 text-lg hover:cursor-pointer"
            >
              Set deadline for task?
            </label>
            <input
              id="deadline"
              type="checkbox"
              onChange={() => setDeadlineCB((prev) => !prev)}
              checked={deadlineCB}
              className="h-6 w-6 rounded border-0 bg-slate-600 text-custom-green focus-within:hidden"
            />
          </div>
          {deadlineCB && (
            <input
              type="date"
              onChange={(e) =>
                setDeadline(
                  new Date(e.target.value).toISOString().split("T")[0]
                )
              }
              value={deadline}
              min={new Date().toISOString().split("T")[0]}
              className="bg-slate-800 rounded-xl border-0 outline-none ring-0 focus:ring-custom-purple focus:ring-2"
            />
          )}
        </div>
        <HorizontalLine />
        {clientMsg && (
          <>
            <p className="w-full text-center py-4 text-xl font-semibold text-custom-red">
              {clientMsg}
            </p>
            <HorizontalLine />
          </>
        )}
        <div className="w-full text-center">
          <button
            onClick={handleUpdate}
            className="py-3 px-5 rounded-xl bg-custom-blue text-custom-black text-xl font-bold"
          >
            Update task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModalFormBody;
