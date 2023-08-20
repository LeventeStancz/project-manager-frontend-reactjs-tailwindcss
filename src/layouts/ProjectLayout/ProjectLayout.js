import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";
import useIsAdmin from "../../hooks/useIsAdmin";

import Searchbar from "../../components/Dashboard/SearchBar";
import ProjectHeader from "../../components/ProjectLayout/ProjectHeader";
import ProjectNavbar from "../../components/ProjectLayout/ProjectNavbar";

function ProjectLayout() {
  const { isAdmin } = useIsAdmin();
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
      <div className="w-full flex justify-between items-center pt-2 pb-6">
        {loading ? (
          <div className="w-fit flex flex-nowrap items-end gap-x-8 py-2">
            <Skeleton containerClassName="w-96" height={24} />
            <div className="flex flex-nowrap items-center gap-x-4">
              <Skeleton height={24} width={24} circle />
              <Skeleton height={24} width={24} circle />
            </div>
          </div>
        ) : (
          <ProjectHeader project={project} />
        )}
        <div className="flex items-center gap-x-8">
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
          {(project?.isOwner || isAdmin) && (
            <ProjectNavbar isAdmin={isAdmin} project={project} />
          )}
        </div>
      </div>
      <Outlet context={[query, setQuery]} />
    </section>
  );
}

export default ProjectLayout;
