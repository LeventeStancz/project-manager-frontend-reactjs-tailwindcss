import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";

import Searchbar from "../../components/Dashboard/SearchBar";
import ProjectHeader from "../../components/ProjectLayout/ProjectHeader";
import ProjectNavbar from "../../components/ProjectLayout/ProjectNavbar";

function ProjectLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectname } = useParams();
  const [project, setProject] = useState({});
  const [query, setQuery] = useState("");

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/projects/${typeof projectname === "undefined" ? "recent" : projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setProject(data.project);
      if (typeof projectname === "undefined") {
        navigate(`/project/${data.projectName}/tasks`, { replace: true });
      }
    }
  }, [data]);

  return (
    <section className="w-full h-full flex flex-col p-5">
      <div className="w-full flex justify-between items-end pt-2 pb-6">
        <ProjectHeader project={project} />
        <div className="flex gap-x-8">
          {location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1
          ) === "tasks" && (
            <Searchbar
              fit={true}
              query={query}
              setQuery={setQuery}
              placeholder={"Search task..."}
              popup={"Search task by name or short description."}
            />
          )}
          <ProjectNavbar project={project} />
        </div>
      </div>

      {loading ? <div>loading</div> : <Outlet />}
    </section>
  );
}

export default ProjectLayout;
