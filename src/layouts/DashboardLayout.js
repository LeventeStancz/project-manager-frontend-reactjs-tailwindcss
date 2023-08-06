import { useState, useEffect, useMemo } from "react";

import useAxiosGetFetch from "../hooks/useAxiosGetFetch";

import Searchbar from "../components/Dashboard/SearchBar";
import FilterItem from "../components/Dashboard/FilterItem";
import CreateProjectModal from "../components/Modals/Project/CreateProjectModal";
import Projects from "../components/Dashboard/Projects";
import HorizontalLine from "../components/Special/HorizontalLine";

function DashboardLayout() {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFiltes] = useState({
    onlyActive: false,
    onlyOwned: false,
  });
  const [projects, setProjects] = useState([]);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  const { data, loading, fetchError } = useAxiosGetFetch(`/projects`);

  useEffect(() => {
    if (!fetchError && data != null) {
      setProjects(data.projects);
    }
  }, [data]);

  //for the searching state
  useEffect(() => {
    setSearching(query !== "" || filters.onlyActive || filters.onlyOwned);
  }, [query, filters.onlyActive, filters.onlyOwned]);

  //filtering - useMemo only run if [projects, query, filters.onlyActive, filters.onlyOwned] changes
  const filteredProjects = useMemo(() => {
    let result;
    if (!searching) {
      //recenlty viewed project (last 3)
      result = projects
        .sort((first, second) => {
          return (
            new Date(first.recentlyViewed) - new Date(second.recentlyViewed)
          );
        })
        .slice(0, 3);
    } else {
      //query
      result = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.shortDescription.toLowerCase().includes(query.toLowerCase())
        );
      });
      //onlyAcitve
      if (filters.onlyActive) {
        result.filter((project) => {
          return project.isActive;
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
          return project.isActive && project.isOwner;
        });
      }
    }
    return result;
  }, [projects, query, filters.onlyActive, filters.onlyOwned]);

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
          <h2>{searching ? "Search results:" : "Recently viewed projects:"}</h2>
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
        {loading ? (
          <div>loading</div>
        ) : (
          <>
            <HorizontalLine />
            <Projects
              projects={filteredProjects}
              emptyText={
                searching ? "No projects found." : "You are not in any project."
              }
            />
            <h2 className="py-2 mt-6">All project:</h2>
            <HorizontalLine />
            <Projects
              projects={projects}
              emptyText={"You are not in any project."}
            />
          </>
        )}
      </section>
    </section>
  );
}

export default DashboardLayout;
