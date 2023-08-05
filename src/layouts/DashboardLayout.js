import { useState, useEffect, useMemo } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import Searchbar from "../components/Dashboard/SearchBar";
import FilterItem from "../components/Dashboard/FilterItem";

import CreateProjectModal from "../components/Modals/Project/CreateProjectModal";
import Projects from "../components/Dashboard/Projects";

function DashboardLayout() {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFiltes] = useState({
    onlyActive: false,
    onlyOwned: false,
  });
  const [projects, setProjects] = useState([]);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const { authToken } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  //for the searching state
  useEffect(() => {
    setSearching(query !== "" || filters.onlyActive || filters.onlyOwned);
  }, [query, filters.onlyActive, filters.onlyOwned]);

  //filtering
  const filteredProjects = useMemo(() => {
    let result = projects.filter((project) => {
      return project.name.toLowerCase().includes(query.toLowerCase());
    });
    //onlyAcitve
    if (filters.onlyActive) {
      result.filter((project) => {
        return project.isActive === true;
      });
    }
    //onlyOwned
    if (filters.onlyOwned) {
      result.filter((project) => {
        return project.isOwner;
      });
    }
    //both
    if (filters.onlyActive && filters.onlyOwned) {
      result.filter((project) => {
        return project.isActive === true && project.isOwner;
      });
    }
    return result;
  }, [projects, query, filters.onlyActive, filters.onlyOwned]);

  /*useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProjects = async () => {
      try {
        const response = await axiosPrivate.get(`/projects/${auth?.userid}`, {
          signal: controller.signal,
        });
        isMounted && setProjects(response?.data?.projects);
      } catch (error) {
        if (!error.response?.data?.clientMsg || !error.response?.data?.error) {
          console.log("Server offline. Try again later.");
        } else {
          console.log(error.response.data.clientMsg);
          console.log(error.response.data.error);
        }
      }
    };
    getProjects();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);*/

  return (
    <section className="w-full h-full flex flex-col p-5">
      <div className="w-full flex items-center py-3">
        <h1 className="text-5xl">Dashboard</h1>
        <div className="flex flex-nowrap flex-1 justify-end items-center space-x-6">
          <Searchbar
            fit={true}
            query={query}
            setQuery={setQuery}
            placeholder={"Search project..."}
            popup={"Search project by name or short description."}
          />
          <h2 className="text-lg text-custom-purple">Quick filters:</h2>
          <FilterItem
            checked={filters.onlyActive}
            setChecked={() => {
              setFiltes((prev) => {
                return {
                  ...prev,
                  onlyActive: !prev.onlyActive,
                };
              });
            }}
            title="Active projects"
          />
          <FilterItem
            checked={filters.onlyOwned}
            setChecked={() => {
              setFiltes((prev) => {
                return {
                  ...prev,
                  onlyOwned: !prev.onlyOwned,
                };
              });
            }}
            title="Projects owned by you"
          />
        </div>
      </div>
      <section className="w-full h-fit py-4">
        <div className="w-full flex justify-between items-end py-2">
          <h2>{searching ? "Search results" : "Recently viewed projects:"}</h2>
          <div
            onClick={() => setCreateProjectModal((prev) => !prev)}
            className="w-fit h-fit px-3 py-2 bg-slate-700 rounded-xl hover:cursor-pointer"
          >
            <p className="font-semibold">Create project</p>
          </div>
          <CreateProjectModal
            show={createProjectModal}
            closeModal={() => setCreateProjectModal(false)}
          />
        </div>
        <div className="w-full h-1 bg-custom-gray-light"></div>
        <Projects projects={filteredProjects} />
        <h2 className="py-2 mt-6">All project:</h2>
        <div className="w-full h-1 bg-custom-gray-light"></div>
        <Projects projects={projects} />
      </section>
    </section>
  );
}

export default DashboardLayout;
