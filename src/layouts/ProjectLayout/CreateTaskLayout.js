import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function CreateTaskLayout() {
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

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/members/${projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setUsers(data?.users);
      setAssignedTo(data?.users[0]?._id);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        `/tasks/create/${projectname}`,
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
      //clear fields
      setTimeout(() => {
        setClientMsg("");
        setTitle("");
        setShortDesc("");
        setDesc("");
        setDeadline(new Date().toISOString().split("T")[0]);
        setDeadlineCB(false);
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
    <div className="w-full h-full overflow-y-auto overflow-x-hide flex flex-col justify-start items-center">
      <h1 className="text-3xl text-custom-blue font-semibold">
        Create a new task
      </h1>
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4 py-2">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="subject" className="self-start text-xl">
                Title:
              </label>
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
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="Description" className="self-start text-xl">
                Short description:
              </label>
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
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="Description" className="self-start text-xl">
                Description:
              </label>
              <textarea
                type="text"
                id="Description"
                autoComplete="off"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="w-full h-10 max-h-80 text-left py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
              ></textarea>
            </div>
            <div className="w-full py-2 flex flex-row justify-between items-center flex-nowrap">
              <div>
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
              <div>
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
            <div className="w-full py-2 falex flex-row justify-between items-center flex-nowrap">
              <div>
                <h2 className="pl-2 text-lg hover:cursor-pointer">
                  Assigned to?
                </h2>
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
            {clientMsg && (
              <p className="w-full text-center py-4 text-xl font-semibold text-custom-red">
                {clientMsg}
              </p>
            )}
            <div className="w-full text-center">
              <button className="py-3 px-5 rounded-xl bg-custom-blue text-custom-black text-xl font-bold">
                Create task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskLayout;
