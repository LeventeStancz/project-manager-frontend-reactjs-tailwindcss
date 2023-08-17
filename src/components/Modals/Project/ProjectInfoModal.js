import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";

import Skeleton from "react-loading-skeleton";

import DateBox from "../../Special/DateBox";
import HorizontalLine from "../../Special/HorizontalLine";

import useAxiosGetFetch from "../../../hooks/useAxiosGetFetch";

function ProjectInfoModal({ show, closeModal }) {
  const { projectname } = useParams();
  const [project, setProject] = useState({});

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/projects/detailed/${
      typeof projectname === "undefined" ? "recent" : projectname
    }`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setProject(data?.project);
    }
  }, [data]);

  if (!show) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") closeModal();
  };

  return ReactDOM.createPortal(
    <div
      id="container"
      onClick={handleOnClose}
      className="h-screen fixed top-0 w-full backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-8"
    >
      <div className="p-6 w-4/6 min-w-[800px] bg-custom-gray-base rounded-2xl overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="w-full flex items-center gap-x-4 text-lg">
            <h1 className="w-full text-3xl font-bold text-custom-blue">
              Details about the project:
            </h1>
            <div className="text-xl w-full flex justify-evenly">
              {loading ? (
                <Skeleton containerClassName="w-full px-4" height={30} />
              ) : (
                <>
                  <DateBox date={project?.createdAt} />
                  ---
                  <DateBox date={project?.finished} />
                </>
              )}
            </div>
          </div>
          <p
            onClick={closeModal}
            className="text-2xl text-custom-red font-bold hover:cursor-pointer"
          >
            <XCircleIcon className="h-9 w-9" />
          </p>
        </div>
        <div className="w-full py-2 flex flex-col gap-y-4">
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Owner:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            {loading ? (
              <Skeleton containerClassName="w-full px-4" height={30} />
            ) : (
              <>
                <h1 className="text-2xl px-1">{project?.owner?.username}</h1>
                <h1 className="text-xl px-1 text-zinc-400">
                  {project?.owner?.email}
                </h1>
              </>
            )}
            <HorizontalLine />
          </div>
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Name:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            {loading ? (
              <Skeleton containerClassName="w-full px-4" height={28} />
            ) : (
              <h1 className="text-2xl px-1">{project?.name}</h1>
            )}
            <HorizontalLine />
          </div>
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Short description:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            {loading ? (
              <Skeleton containerClassName="w-full px-4" height={42} />
            ) : (
              <h2 className="text-xl px-1">{project?.shortDescription}</h2>
            )}
            <HorizontalLine />
          </div>
          <h1 className="text-2xl font-semibold px-1 text-custom-purple">
            Description:
          </h1>
          <div className="flex flex-col gap-y-2">
            <HorizontalLine />
            {loading ? (
              <Skeleton containerClassName="w-full px-4" height={150} />
            ) : (
              <h2 className="text-xl px-1 leading-relaxed">
                {project?.description
                  ? project?.description
                  : "No further information..."}
              </h2>
            )}
            <HorizontalLine />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modaldiv")
  );
}

export default ProjectInfoModal;
