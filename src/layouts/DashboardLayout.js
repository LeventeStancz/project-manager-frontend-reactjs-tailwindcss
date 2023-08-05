import { useState } from "react";

import Searchbar from "../components/Dashboard/SearchBar";
import FilterItem from "../components/Dashboard/FilterItem";

function DashboardLayout() {
  const [query, setQuery] = useState("");
  const [filters, setFiltes] = useState({
    onlyActive: false,
    onlyOwned: false,
  });
  return (
    <section className="w-full h-full flex flex-col p-5">
      <div className="w-full flex items-center py-3">
        <h1 className="text-5xl">Dashboard</h1>
        <div className="flex flex-nowrap flex-1 justify-end items-center space-x-6">
          <Searchbar
            fit={true}
            query={query}
            setQuery={setQuery}
            placeholder={"Search..."}
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
      <>projects here</>
    </section>
  );
}

export default DashboardLayout;
