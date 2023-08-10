import { NavLink } from "react-router-dom";

function ProjectNavbar({ project }) {
  return (
    <div>
      <ul className="flex items-center gap-x-4">
        <NavLink to={`/project/${project?.name}/tasks`}>
          {({ isActive }) => {
            return (
              <div
                className={`text-2xl p-1 flex justify-center items-center ${
                  isActive
                    ? " border-b-2 border-custom-purple"
                    : " hover:border-b-2 hover:border-custom-purple"
                }
    `}
              >
                tasks
              </div>
            );
          }}
        </NavLink>
        <NavLink to={`/project/${project?.name}/create`}>
          {({ isActive }) => {
            return (
              <div
                className={`text-2xl p-1 flex justify-center items-center ${
                  isActive
                    ? " border-b-2 border-custom-purple"
                    : " hover:border-b-2 hover:border-custom-purple"
                }
    `}
              >
                create
              </div>
            );
          }}
        </NavLink>
        <NavLink to={`/project/${project?.name}/members`}>
          {({ isActive }) => {
            return (
              <div
                className={`text-2xl p-1 flex justify-center items-center ${
                  isActive
                    ? " border-b-2 border-custom-purple"
                    : " hover:border-b-2 hover:border-custom-purple"
                }
    `}
              >
                members
              </div>
            );
          }}
        </NavLink>
      </ul>
    </div>
  );
}

export default ProjectNavbar;
