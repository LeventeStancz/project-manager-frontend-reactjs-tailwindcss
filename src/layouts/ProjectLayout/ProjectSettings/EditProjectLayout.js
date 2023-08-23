import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import useAxiosGetFetch from "../../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function EditProjectLayout() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { projectname } = useParams();
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [deadlineCB, setDeadlineCB] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [clientMsg, setClientMsg] = useState("");

  const { data, loading, fetchError } = useAxiosGetFetch(
    `/projects/${projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setName(data?.project?.name);
      setShortDesc(data?.project?.shortDescription);
      setDesc(data?.project?.description);
      setDeadlineCB(data?.project?.finished ? true : false);
      setDeadline(
        data?.project?.finished
          ? data?.project?.finished
          : new Date().toISOString().split("T")[0]
      );
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.put(
        `/projects/update/${projectname}`,
        JSON.stringify({
          name: name.replace(/\s+/g, "-"),
          shortDescription: shortDesc,
          description: desc,
          finished: deadlineCB ? deadline : "undefined",
        })
      );

      setClientMsg(response?.data?.clientMsg);
      setTimeout(() => {
        //navigate to new project details
        setClientMsg("");
        navigate(`/project/${name.replace(/\s+/g, "-")}/edit`, {
          replace: true,
        });
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
      <h1 className="text-3xl text-custom-yellow-base font-semibold">
        Edit project data:
      </h1>
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4 py-2">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name" className="self-start text-xl">
                Name:
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value.replace(/\s+/g, "-"))}
                  value={name}
                  maxLength="32"
                  required
                  className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
                />
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="shortDescription" className="self-start text-xl">
                Short description:
              </label>
              {loading ? (
                <Skeleton height={50} />
              ) : (
                <textarea
                  type="text"
                  id="shortDescription"
                  autoComplete="off"
                  onChange={(e) => setShortDesc(e.target.value)}
                  value={shortDesc}
                  maxLength="128"
                  required
                  className="w-full h-fit resize-none text-left py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
                ></textarea>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="Description" className="self-start text-xl">
                Description:
              </label>
              {loading ? (
                <Skeleton height={80} />
              ) : (
                <textarea
                  type="text"
                  id="Description"
                  autoComplete="off"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className="w-full min-h-[80px] h-24 max-h-80 text-left py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
                ></textarea>
              )}
            </div>
            {loading ? (
              <Skeleton height={40} />
            ) : (
              <div className="flex flex-nowrap items-center justify-between">
                <div className="flex flex-nowrap gap-x-4 py-2 items-center">
                  <label
                    htmlFor="deadline"
                    className="pl-2 text-lg hover:cursor-pointer"
                  >
                    Project has deadline?
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
            )}
            {clientMsg && (
              <p className="w-full text-center py-4 text-xl font-semibold text-custom-red">
                {clientMsg}
              </p>
            )}
            <div className="w-full text-center">
              <button className="py-2 px-4 rounded-xl bg-custom-gray-base text-custom-yellow-base text-lg font-semibold">
                Update project data
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectLayout;
