import { useState } from "react";
import { NavLink } from "react-router-dom";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DateBox from "../../Special/DateBox";
import UserCount from "./UserCount";
import TaskCount from "./TaskCount";

function ProjectCard({
  name,
  shortDescription,
  finished,
  memberCount,
  taskCount,
}) {
  const [infoPopUp, setInfoPopUp] = useState(false);
  return (
    <NavLink to={`/project/${name}/tasks`}>
      <div className="w-64 h-fit hover:cursor-pointer">
        <div className="bg-custom-gray-base rounded-xl px-4 py-3 hover:cursor-pointer">
          <div className="flex flex-col gap-y-4 items-start ">
            <div className="w-full flex flex-nowrap items-center justify-between gap-x-4">
              <p className="text-xl truncate font-semibold break-words leading-thight">
                {name || "Undefined project name"}
              </p>
              <div className="relative text-custom-gray-bright hover:cursor-help">
                <InformationCircleIcon
                  onMouseEnter={() => setInfoPopUp(true)}
                  onMouseLeave={() => setInfoPopUp(false)}
                  className="w-8 h-8 z-0"
                />
                {infoPopUp && (
                  <div className="h-fit min-w-[300px] z-10 w-fit break-words absolute -top-3 left-12 bg-slate-600 py-2 px-3 rounded-lg text-white">
                    {shortDescription}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full py-1 flex flex-col items-center justify-center">
              <DateBox date={finished || "0000.00.00."} />
            </div>

            <div className="w-full flex flex-nowrap items-start justify-between">
              <UserCount count={memberCount || 0} />
              <TaskCount count={taskCount || 0} />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default ProjectCard;
