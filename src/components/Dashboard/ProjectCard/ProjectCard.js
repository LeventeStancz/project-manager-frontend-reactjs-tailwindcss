import { useState } from "react";
import { NavLink } from "react-router-dom";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DateBox from "../../Special/DateBox";
import UserCount from "./UserCount";
import TaskCount from "./TaskCount";

function ProjectCard({
  _id,
  name,
  shortDescription,
  finished,
  memberCount,
  taskCount,
}) {
  const [infoPopUp, setInfoPopUp] = useState(false);
  return (
    <div className="w-64 h-fit relative z-0 flex-shrink-0 hover:cursor-pointer">
      <div className="w-fit h-fit absolute z-10 top-2 right-2 text-custom-gray-bright hover:cursor-help">
        <InformationCircleIcon
          onMouseEnter={() => setInfoPopUp(true)}
          onMouseLeave={() => setInfoPopUp(false)}
          className="w-8 h-8"
        />
        {infoPopUp && (
          <div className="h-fit min-w-[300px] w-fit break-words absolute -top-2 left-10 bg-neutral-700 py-2 px-3 rounded-lg text-custom-purple font-medium text-lg">
            {shortDescription}
          </div>
        )}
      </div>
      <NavLink to={`/project/${_id}`}>
        <div className="w-full h-full flex-shrink-0 bg-custom-gray-base rounded-xl px-4 py-3 hover:cursor-pointer">
          <div className="w-full h-full flex flex-col space-y-4 items-start">
            <p className="text-xl pr-8 font-semibold break-words leading-thight">
              {name || "Undefined project name"}
            </p>

            <div className="w-full py-1 flex flex-col items-center justify-center">
              <DateBox date={finished || "0000.00.00."} />
            </div>

            <div className="w-full flex flex-nowrap items-start justify-between">
              <UserCount count={memberCount || 0} />
              <TaskCount count={taskCount || 0} />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default ProjectCard;
