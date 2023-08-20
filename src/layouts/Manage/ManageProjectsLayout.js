import { useState, useEffect } from "react";
import Searchbar from "../../components/Dashboard/SearchBar";
import Projects from "../../components/Dashboard/Projects";
import HorizontalLine from "../../components/Special/HorizontalLine";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";

function ManageProjectsLayout() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/projects/search/${query ? query : undefined}/false`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setProjects(data?.projects);
    }
  }, [data]);

  return (
    <div>
      <div className="w-full flex justify-between items-center pt-2 pb-6">
        <h1 className="w-fit text-4xl text-custom-orange font-semibold">
          Manage projects
        </h1>
        <Searchbar
          width="1/2"
          query={query}
          setQuery={setQuery}
          placeholder={"Start typing for results..."}
          popup={"Search project by name or short description."}
        />
      </div>
      <div>
        <h2 className="py-2 mt-6 text-lg">Search results:</h2>
        <HorizontalLine />
        <Projects projects={projects} emptyText="No projects found..." />
      </div>
    </div>
  );
}

export default ManageProjectsLayout;
